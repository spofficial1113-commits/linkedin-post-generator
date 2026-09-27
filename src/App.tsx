/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, EventConfig, PostDraft } from './types';
import { INITIAL_EVENT_CONFIG, INITIAL_POST_DRAFT } from './data/mockData';
import { Header } from './components/Header';
import { OrganizerView } from './components/OrganizerView';
import { AttendeeView } from './components/AttendeeView';
import { HelpModal } from './components/HelpModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('attendee');
  const [eventConfig, setEventConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);
  const [draft, setDraft] = useState<PostDraft>(INITIAL_POST_DRAFT);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Sync hash routing so users can bookmark or jump
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'organizer' || hash === 'attendee') {
        setCurrentView(hash as ViewMode);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateConfig = (updated: Partial<EventConfig>) => {
    setEventConfig((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handleUpdateDraft = (updated: Partial<PostDraft>) => {
    setDraft((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handleOpenNotifications = () => {
    setNotificationsOpen(true);
    setUnreadNotifications(0);
  };

  return (
    <div className="min-h-screen bg-[#f4f3f8] text-[#1a1b1f] flex flex-col font-body selection:bg-[#e3dfff] selection:text-[#100069]">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenHelp={() => setHelpOpen(true)}
        onOpenNotifications={handleOpenNotifications}
        unreadCount={unreadNotifications}
      />

      {/* Main Viewport Container */}
      <main className="w-full flex-1 pt-16">
        {currentView === 'organizer' ? (
          <OrganizerView
            eventConfig={eventConfig}
            onUpdateConfig={handleUpdateConfig}
            onNavigateToAttendee={() => handleViewChange('attendee')}
          />
        ) : (
          <AttendeeView
            eventConfig={eventConfig}
            draft={draft}
            onUpdateDraft={handleUpdateDraft}
          />
        )}
      </main>

      {/* Help & Guidelines Modal */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Notifications / Telemetry Drawer */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
