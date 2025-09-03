// Certificates.tsx
import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

const Certificates = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const email = user.email?.toLowerCase();

      const snap = await getDocs(collectionGroup(db, 'registrations'));
      const data = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(
          d =>
            d.email?.toLowerCase() === email &&
            d.certificateIssued === true // ✅ less strict filter
        );

      setCertificates(data);
    };

    fetchCertificates();
  }, [navigate]);

  const handleDownload = (certificate: any) => {
    setSelectedCertificate(certificate);

    setTimeout(() => {
      const element = document.getElementById('certificate-template');
      if (element) {
        html2pdf()
          .from(element)
          .set({
            margin: 0.5,
            filename: `${certificate.name || 'student'}-${certificate.eventName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
          })
          .save();
      }
    }, 100);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {certificates.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No certificates available yet. Once your certificate is issued, it will appear here.
        </p>
      ) : (
        certificates.map((c, i) => (
          <Card key={i} className="mb-4">
            <CardHeader>
              <CardTitle>{c.eventName || 'Event Name Missing'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Name:</strong> {c.name || 'Student'}</p>
              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Certificate:</strong> Issued ✅</p>
              <Button onClick={() => handleDownload(c)}>Download Certificate</Button>
            </CardContent>
          </Card>
        ))
      )}

      {selectedCertificate && (
        <div
          id="certificate-template"
          className="hidden bg-white p-10 w-[1000px] h-[700px] shadow-md border text-center"
        >
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Certificate of Participation</h1>
          <p className="text-lg mb-4">This is to certify that</p>
          <h2 className="text-2xl font-semibold mb-4">{selectedCertificate.name || 'Student Name'}</h2>
          <p className="text-lg mb-4">has successfully participated in the event</p>
          <h3 className="text-xl font-medium mb-4">{selectedCertificate.eventName || 'Event Name'}</h3>
          <p className="text-gray-600">
            Date of Completion: {selectedCertificate.completionDate || new Date().toISOString().split('T')[0]}
          </p>
          <div className="mt-16 flex justify-between px-10">
            <div>
              <p className="border-t-2 border-gray-700 w-40 mx-auto mt-2">Coordinator</p>
            </div>
            <div>
              <p className="border-t-2 border-gray-700 w-40 mx-auto mt-2">Head of Department</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
