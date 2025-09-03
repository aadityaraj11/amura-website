
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-black-600 to-grey-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">AMURA</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            A vibrant technical club fostering innovation, collaboration, and excellence in technology.
            Join us in building the future, one project at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full">
                Join Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/events">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-full">
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              To create a dynamic learning environment where students can explore cutting-edge technologies,
              collaborate on innovative projects, and develop skills that prepare them for the future of technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-black-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pushing boundaries with cutting-edge technology and creative problem-solving approaches.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-black-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Building strong networks and fostering teamwork among passionate tech enthusiasts.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-black-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Striving for the highest standards in everything we do, from projects to competitions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-400">Awards Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
