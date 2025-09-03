
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Arjun Sharma',
      role: 'President',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Leading AMURA with passion for innovation and community building. Full-stack developer with expertise in React and Node.js.',
      linkedin: 'https://linkedin.com/in/arjun-sharma',
      github: 'https://github.com/arjun-sharma',
      email: 'arjun@amura.club'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Vice President',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c00b8f7e?w=300&h=300&fit=crop&crop=face',
      bio: 'Passionate about AI/ML and data science. Organizing workshops and mentoring junior members in their technical journey.',
      linkedin: 'https://linkedin.com/in/priya-patel',
      github: 'https://github.com/priya-patel',
      email: 'priya@amura.club'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'DevOps enthusiast and cloud architect. Manages our technical infrastructure and leads hackathon teams.',
      linkedin: 'https://linkedin.com/in/rahul-kumar',
      github: 'https://github.com/rahul-kumar',
      email: 'rahul@amura.club'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Events Coordinator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Creative mind behind our amazing events. Specializes in UI/UX design and frontend development.',
      linkedin: 'https://linkedin.com/in/sneha-reddy',
      github: 'https://github.com/sneha-reddy',
      email: 'sneha@amura.club'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Marketing Head',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'Digital marketing expert and content creator. Handles our social media presence and community outreach.',
      linkedin: 'https://linkedin.com/in/vikram-singh',
      github: 'https://github.com/vikram-singh',
      email: 'vikram@amura.club'
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      role: 'Finance Head',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop&crop=face',
      bio: 'Finance and operations expert. Ensures smooth functioning of club activities and manages partnerships.',
      linkedin: 'https://linkedin.com/in/ananya-gupta',
      github: 'https://github.com/ananya-gupta',
      email: 'ananya@amura.club'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About AMURA
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We are a vibrant community of tech enthusiasts, innovators, and dreamers who believe in the power of 
            collaboration and continuous learning. Our mission is to create an environment where students can explore, 
            experiment, and excel in the world of technology.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To foster innovation, creativity, and technical excellence among students by providing a platform for 
                learning, collaboration, and growth in the ever-evolving world of technology.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be the leading technical community that empowers students to become future technology leaders, 
                innovators, and problem-solvers who make a positive impact on society.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Core Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The passionate individuals who make AMURA's vision a reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We encourage creative thinking and breakthrough solutions to complex problems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in the power of teamwork and collective intelligence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Learning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We foster a culture of continuous learning and knowledge sharing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg mb-6 opacity-90">
              Have questions or want to collaborate? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-purple-600 hover:bg-gray-100">
                <a href="mailto:contact@amura.club">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <a href="/register">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Our Community
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
