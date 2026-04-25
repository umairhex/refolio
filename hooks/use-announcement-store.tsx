"use client";

import React, { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Announcement {
  featureId: string;
  seenAt: string | null;
  dismissedAt: string | null;
  interactedAt: string | null;
  eligibleSegments: string[];
}

interface AnnouncementState {
  announcements: Record<string, Announcement>;
  actions: {
    markAsSeen: (featureId: string) => void;
    dismiss: (featureId: string) => void;
    interact: (featureId: string) => void;
    reset: (featureId: string) => void;
  };
}

const createAnnouncementStore = () =>
  createStore<AnnouncementState>()(
    devtools(
      persist(
        (set) => ({
          announcements: {},
          actions: {
            markAsSeen: (featureId) =>
              set(
                (state) => ({
                  announcements: {
                    ...state.announcements,
                    [featureId]: {
                      ...(state.announcements[featureId] || {
                        featureId,
                        seenAt: null,
                        dismissedAt: null,
                        interactedAt: null,
                        eligibleSegments: [],
                      }),
                      seenAt: new Date().toISOString(),
                    },
                  },
                }),
                false,
                "announcement/markAsSeen"
              ),
            dismiss: (featureId) =>
              set(
                (state) => ({
                  announcements: {
                    ...state.announcements,
                    [featureId]: {
                      ...(state.announcements[featureId] || {
                        featureId,
                        seenAt: null,
                        dismissedAt: null,
                        interactedAt: null,
                        eligibleSegments: [],
                      }),
                      dismissedAt: new Date().toISOString(),
                    },
                  },
                }),
                false,
                "announcement/dismiss"
              ),
            interact: (featureId) =>
              set(
                (state) => ({
                  announcements: {
                    ...state.announcements,
                    [featureId]: {
                      ...(state.announcements[featureId] || {
                        featureId,
                        seenAt: null,
                        dismissedAt: null,
                        interactedAt: null,
                        eligibleSegments: [],
                      }),
                      interactedAt: new Date().toISOString(),
                    },
                  },
                }),
                false,
                "announcement/interact"
              ),
            reset: (featureId) =>
              set(
                (state) => {
                  const announcements = { ...state.announcements };
                  delete announcements[featureId];
                  return { announcements };
                },
                false,
                "announcement/reset"
              ),
          },
        }),
        {
          name: "announcement-storage",
        }
      ),
      { name: "AnnouncementStore" }
    )
  );

type AnnouncementStore = ReturnType<typeof createAnnouncementStore>;
const AnnouncementContext = createContext<AnnouncementStore | null>(null);

export const AnnouncementProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = React.useState(() => createAnnouncementStore());
  return (
    <AnnouncementContext.Provider value={store}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => {
  const store = useContext(AnnouncementContext);
  if (!store) throw new Error("useAnnouncements must be used within an AnnouncementProvider");
  return useStore(store, (state) => state.announcements);
};

export const useAnnouncementActions = () => {
  const store = useContext(AnnouncementContext);
  if (!store) throw new Error("useAnnouncementActions must be used within an AnnouncementProvider");
  return useStore(store, (state) => state.actions);
};
