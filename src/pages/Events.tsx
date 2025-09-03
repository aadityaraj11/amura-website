// Events.tsx
import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), async (snapshot) => {
      const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);

      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const registeredIds: string[] = [];

      for (const event of eventList) {
        const q = query(
          collection(db, `events/${event.id}/registrations`),
          where('email', '==', user.email)
        );
        const regSnap = await getDocs(q);
        if (!regSnap.empty) {
          registeredIds.push(event.id);
        }
      }

      setRegisteredEventIds(registeredIds);
    });

    return () => unsubscribe();
  }, [navigate]);

  const register = async (event: any) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to register.');
      navigate('/login');
      return;
    }

    await addDoc(collection(db, `events/${event.id}/registrations`), {
      email: user.email,
      name: user.displayName || 'Student Name',
      eventName: event.title, // ✅ Required for certificate page
      completionDate: event.date || new Date().toISOString().split('T')[0],
      status: 'registered',
      certificateIssued: false,
      timestamp: new Date(),
    });

    alert('Registered successfully!');
    setRegisteredEventIds((prev) => [...prev, event.id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Our Events
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join hands-on workshops, hackathons and seminars to learn and grow!
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <Card
              key={ev.id}
              className="shadow-lg border-0 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {ev.title}
                  </CardTitle>
                  {ev.type && (
                    <Badge variant="outline" className="uppercase text-xs">
                      {ev.type}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p>{ev.description}</p>
                <div className="flex flex-col gap-2 text-sm">
                  {ev.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{ev.date}</span>
                    </div>
                  )}
                  {ev.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{ev.location}</span>
                    </div>
                  )}
                  {ev.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{ev.capacity} capacity</span>
                    </div>
                  )}
                </div>

                {registeredEventIds.includes(ev.id) ? (
                  <div className="w-full mt-4 text-green-600 font-semibold text-center">
                    ✅ Successfully Registered
                  </div>
                ) : (
                  <Button
                    onClick={() => register(ev)}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium tracking-wide"
                  >
                    Register Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
