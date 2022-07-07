import { writable } from "svelte/store";

export const expanded = writable<boolean>(false);