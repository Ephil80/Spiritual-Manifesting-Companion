import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Bell, BellOff, Clock } from 'lucide-react';

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        addNotification('welcome', 'Welcome to daily Divine Design reminders! Your spiritual growth journey is now supported with gentle daily guidance.');
      }
    }
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const sendDailyReminder = () => {
    const reminders = [
      "Your ego will try to create problems today. Remember: you have divine authority over your thoughts.",
      "Take 3 deep breaths and ask: 'How is Divine Design working in this situation?'",
      "When you feel stressed, remember: your soul knows peace. Connect with that divine nature now."
    ];
    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
    addNotification('reminder', randomReminder);
  };

  return (
    <div className="space-y-6">
      {/* Notification Settings Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-indigo-500" />
            <CardTitle className="text-lg text-indigo-800">Daily Spiritual Reminders</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-800 font-medium">Enable Daily Reminders</p>
                <p className="text-indigo-600 text-sm">Get gentle nudges for your spiritual practice</p>
              </div>
              <Button 
                onClick={notificationsEnabled ? () => setNotificationsEnabled(false) : requestNotificationPermission}
                className={notificationsEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'}
              >
                {notificationsEnabled ? (
                  <><Bell className="w-4 h-4 mr-2" /> Enabled</>
                ) : (
                  <><BellOff className="w-4 h-4 mr-2" /> Enable</>
                )}
              </Button>
            </div>
            
            {notificationsEnabled && (
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <p className="text-indigo-700 text-sm font-medium">Next reminder coming soon!</p>
                </div>
                <Button 
                  onClick={sendDailyReminder}
                  size="sm"
                  variant="outline"
                  className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                >
                  Get Reminder Now
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Spiritual Boosts */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-lg text-emerald-800">Quick Spiritual Boosts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => addNotification('wisdom', 'Your challenges are perfectly designed for your spiritual growth. Trust the Divine Design.')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-left p-4 h-auto"
            >
              <div>
                <p className="font-medium">Need Encouragement?</p>
                <p className="text-sm text-emerald-100">Get instant divine wisdom</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => addNotification('practice', 'Take 3 deep breaths and say: "I choose Divine Design over ego chaos." Feel the shift.')}
              className="bg-teal-500 hover:bg-teal-600 text-white text-left p-4 h-auto"
            >
              <div>
                <p className="font-medium">Feeling Stressed?</p>
                <p className="text-sm text-teal-100">Quick centering practice</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">Recent Spiritual Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="p-4 bg-white/80 rounded-lg border border-purple-200"
                >
                  <p className="text-purple-700 leading-relaxed text-sm">
                    {notification.message}
                  </p>
                  <p className="text-xs text-purple-500 mt-2">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};