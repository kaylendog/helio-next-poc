"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import io, { Socket } from "socket.io-client";
import { P, match } from "ts-pattern";

const SOCKET_URL = "http://localhost:3000";

const socketsAtom = atom<Record<string, Socket>>({});

/**
 * Use a socket by namespace. Internal method to manage socket connections. Sockets are cached by namespace.
 * @param namespace
 * @returns
 */
const useSocket = (namespace: string) => {
	const [sockets, setSockets] = useAtom(socketsAtom);

	return match(sockets[namespace])
		.with(P.nullish, () => io(`${SOCKET_URL}${namespace}`, { multiplex: true }))
		.otherwise((socket) => socket);
};

/**
 * Use a socket query by namespace and event.
 * @param namespace
 * @param event
 */
export const useSocketQuery = (namespace: string, event: string) => {
	const socket = useSocket(namespace);
	return useQuery({
		queryKey: ["socket", namespace, event],
		queryFn: (asdf) =>
			new Promise((resolve) => {
				// no guarantee that the first event we receive is responding to this query -
				// this is annoying since we must switch on the nonce, which has implications
				// on query caching, but a compromise we must accept with a socket connection
				const nonce = Math.random().toString(36).substring(7);

				const listener = (data: { nonce: string }) => {
					if (data.nonce === nonce) {
						resolve(data);
						socket.off(event, listener);
					}
				};

				// listen and emit
				socket.on(event, listener).emit(event, { nonce });
			}),
	});
};

/**
 * Use a socket mutation by namespace and event.
 * @param namespace
 * @param event
 * @returns
 */
export const useSocketMutation = (namespace: string, event: string) => {
	const socket = useSocket(namespace);
	const queryClient = useQueryClient();

	return useCallback(
		(data: unknown) =>
			new Promise((resolve) => {
				const nonce = Math.random().toString(36).substring(7);
				const listener = (data: { nonce: string }) => {
					if (data.nonce === nonce) {
						resolve(data);
						socket.off(event, listener);
					}
				};
				socket.on(event, listener).emit(event, { nonce, data });
			}).then(() => {
				queryClient.invalidateQueries({ queryKey: ["socket", namespace, event] });
			}),
		[socket, queryClient]
	);
};
