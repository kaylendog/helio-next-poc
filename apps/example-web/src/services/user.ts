"use client";

import { PARTY_ROUTES } from "hvsc-g2-backend/src/components/party/party.types";

import { useSocketQuery } from "./socket";

export const useFetchUserQuery = () => useSocketQuery("/user", PARTY_ROUTES.GET_PARTY.route);
