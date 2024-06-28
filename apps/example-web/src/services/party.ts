"use client";

import { PARTY_ROUTES } from "hvsc-g2-backend/src/components/party/party.types";

import { useSocketMutation, useSocketQuery } from "./socket";

/**
 * Fetch the user's party.
 */
export const usePartyQuery = () => useSocketQuery("/party", PARTY_ROUTES.GET_PARTY.route);

/**
 * Fetch a party by ID.
 */
export const useFetchPartyQuery = () => useSocketQuery("/party", PARTY_ROUTES.GET_PARTY.route);

/**
 * Create a party.
 */
export const useCreatePartyMutation = () =>
	useSocketMutation("/party", PARTY_ROUTES.CREATE_PARTY.route);

/**
 * Invite a user to a party.
 */
export const useInviteToPartyMutation = () =>
	useSocketMutation("/party", PARTY_ROUTES.INVITE_TO_PARTY.route);

/**
 * Accept a party invitation.
 */
export const useLeavePartyMutation = () =>
	useSocketMutation("/party", PARTY_ROUTES.LEAVE_PARTY.route);
