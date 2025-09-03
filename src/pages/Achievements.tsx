
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Users, Star, Calendar, Target } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      year: '2024',
      title: 'Best Technical Club Award',
      description: 'Recognized as the most innovative technical club in the university for outstanding project contributions and community impact.',
      type: 'Award',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      year: '2024',
      title: 'National Hackathon Champions',
      description: 'Our team "Code Crushers" won first place in the National Student Hackathon with their innovative healthcare solution.',
      type: 'Competition',
      icon: Award,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      year: '2023',
      title: 'Industry Partnership - TechCorp',
      description: 'Established a strategic partnership with TechCorp for internship opportunities and real-world project collaborations.',
      type: 'Partnership',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      year: '2023',
      title: '500+ Active Members Milestone',
      description: 'Reached a significant milestone of 500+ active members, making us the largest technical club on campus.',
      type: 'Milestone',
      icon: Star,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      year: '2023',
      title: 'Open Source Contribution Initiative',
      description: 'Launched the "Code for Good" initiative, contributing to 25+ open source projects and impacting thousands of developers.',
      type: 'Initiative',
      icon: Target,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 6,
      year: '2022',
      title: 'Excellence in Student Engagement',
      description: 'Awarded by the university for exceptional student engagement and innovative learning methodologies.',
      type: 'Recognition',
      icon: Trophy,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { label: 'Awards Won', value: '25+', icon: Trophy },
    { label: 'Projects Completed', value: '100+', icon: Target },
    { label: 'Students Impacted', value: '1000+', icon: Users },
    { label: 'Years of Excellence', value: '5+', icon: Calendar }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A journey of excellence, innovation, and impact. Here's how AMURA has been making a difference 
            in the technical community and beyond.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
          
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <achievement.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{achievement.year}</Badge>
                            <Badge variant="secondary">{achievement.type}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                </div>
                
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Be Part of Our Success Story</h2>
              <p className="text-lg mb-6 opacity-90">
                Join AMURA and contribute to our legacy of excellence, innovation, and impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Now
                </a>
                <a href="/events" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                  View Events
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
