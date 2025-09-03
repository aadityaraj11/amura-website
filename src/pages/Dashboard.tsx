import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import {
  collection, addDoc, getDocs, doc, updateDoc, onSnapshot
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const AdminDashboard = () => {
  const [eventData, setEventData] = useState({
    title: '', date: '', description: '', capacity: '', type: '', status: 'upcoming'
  });
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [registrations, setRegistrations] = useState<any[]>([]);

  const handleChange = (field: string, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, 'events'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEvents(data);
    if (!selectedEventId && data.length > 0) setSelectedEventId(data[0].id);
  };

  const fetchRegistrations = async (eventId: string) => {
    if (!eventId) return;
    const snap = await getDocs(collection(db, `events/${eventId}/registrations`));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRegistrations(data);
  };

  const handleCreateEvent = async () => {
    const { title, date, description, capacity, type, status } = eventData;
    if (!title || !date || !description || !capacity || !type || !status) return;
    await addDoc(collection(db, 'events'), {
      title, date, description,
      capacity: Number(capacity), type, status,
      createdAt: new Date()
    });
    setEventData({ title: '', date: '', description: '', capacity: '', type: '', status: 'upcoming' });
    fetchEvents();
  };

  const markAttendance = async (regId: string, present: boolean) => {
    const ref = doc(db, `events/${selectedEventId}/registrations/${regId}`);
    await updateDoc(ref, { status: present ? 'attended' : 'absent' });
    fetchRegistrations(selectedEventId);
  };

  const issueCertificate = async (regId: string) => {
    const ref = doc(db, `events/${selectedEventId}/registrations/${regId}`);
    await updateDoc(ref, { 
      status: "attended", // ensure correct status
      certificateIssued: true,
      completionDate: new Date().toISOString().split("T")[0]
    });
    fetchRegistrations(selectedEventId);
  };
  
  
 
  const fixMissingEventNames = async () => {
    const eventsSnap = await getDocs(collection(db, 'events'));

    for (const eventDoc of eventsSnap.docs) {
      const eventId = eventDoc.id;
      const eventData = eventDoc.data();
      const eventName = eventData.title;

      const regSnap = await getDocs(collection(db, `events/${eventId}/registrations`));

      for (const regDoc of regSnap.docs) {
        const regData = regDoc.data();
        if (!regData.eventName) {
          await updateDoc(doc(db, `events/${eventId}/registrations/${regDoc.id}`), {
            eventName
          });
        }
      }
    }
    alert('✅ Fixed all missing event names in registrations.');
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) fetchRegistrations(selectedEventId);
  }, [selectedEventId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Tabs defaultValue="events">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="events">Create Events</TabsTrigger>
          <TabsTrigger value="registrations">Manage Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card>
            <CardHeader><CardTitle>Create New Event</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Event Title" value={eventData.title} onChange={e => handleChange('title', e.target.value)} />
              <Input type="date" value={eventData.date} onChange={e => handleChange('date', e.target.value)} />
              <Textarea placeholder="Description" value={eventData.description} onChange={e => handleChange('description', e.target.value)} />
              <Input placeholder="Capacity" value={eventData.capacity} onChange={e => handleChange('capacity', e.target.value)} />
              <Select value={eventData.type} onValueChange={val => handleChange('type', val)}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleCreateEvent} className="w-full">Create Event</Button>
              <Button variant="outline" className="w-full" onClick={fixMissingEventNames}>
                🛠 Fix Missing Event Names
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registrations">
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger><SelectValue placeholder="Select event" /></SelectTrigger>
            <SelectContent>
              {events.map(e => <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="mt-6 space-y-4">
            {registrations.map(r => (
              <div key={r.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p>{r.name || r.email}</p>
                  <p className="text-sm">Status: {r.status || 'Not Marked'} | Cert: {r.certificateIssued ? '✅' : '❌'}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => markAttendance(r.id, true)}>Present</Button>
                  <Button size="sm" variant="outline" onClick={() => markAttendance(r.id, false)}>Absent</Button>
                  <Button size="sm" variant="secondary" disabled={r.status !== 'attended'} onClick={() => issueCertificate(r.id)}>Issue Certificate</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;