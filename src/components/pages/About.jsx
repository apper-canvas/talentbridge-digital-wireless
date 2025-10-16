import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: "Target",
      title: "Precision Matching",
      description: "We use advanced algorithms and human expertise to ensure the perfect fit between candidates and opportunities."
    },
    {
      icon: "Heart",
      title: "People First",
      description: "Every placement is about more than just filling a position - it's about changing lives and building futures."
    },
    {
      icon: "Zap",
      title: "Speed & Efficiency",
      description: "We understand that time is crucial in hiring. Our streamlined process delivers results quickly without compromising quality."
    },
    {
      icon: "Shield",
      title: "Trust & Integrity",
      description: "We maintain the highest standards of professionalism and confidentiality in all our interactions."
    }
  ];

  const team = [
    {
      name: "Sarah Martinez",
      role: "CEO & Founder",
      bio: "15+ years in talent acquisition with a passion for connecting people with their dream careers.",
      avatar: "👩‍💼"
    },
    {
      name: "David Chen",
      role: "VP of Technology",
      bio: "Former software engineer turned tech recruiter, specializing in building scalable hiring solutions.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Johnson",
      role: "Head of Client Success",
      bio: "Dedicated to ensuring both candidates and employers have exceptional experiences throughout the placement process.",
      avatar: "👩‍🎯"
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Placement Specialist",
      bio: "Expert in healthcare and finance recruitment with a track record of successful executive placements.",
      avatar: "👨‍⚕️"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Professionals Placed" },
    { number: "5,000+", label: "Partner Companies" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "15+", label: "Years of Experience" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bridging Talent with
            <span className="block bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
              Extraordinary Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Founded in 2008, TalentBridge has been at the forefront of connecting exceptional 
            talent with innovative companies. We believe that the right match can transform careers, 
            teams, and entire organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate("/jobs")}
            >
              Explore Opportunities
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To revolutionize the way talent and opportunity connect by leveraging cutting-edge 
              technology, human insight, and personalized service. We're not just a placement 
              service - we're career architects and growth partners.
            </p>
          </div>

          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-primary-50 to-accent-50">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Compass" className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Guiding Careers, Building Futures
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every placement we make is a step toward building stronger teams, more innovative 
              companies, and more fulfilled professionals. We measure our success not just in 
              placements made, but in careers advanced and dreams realized.
            </p>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and define how we serve our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={value.icon} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Behind every great placement is a team of passionate professionals dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mx-auto">
                  <ApperIcon name="Lightbulb" className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Beginning (2008)</h3>
                <p className="text-gray-600 leading-relaxed">
                  TalentBridge was founded by Sarah Martinez after she experienced firsthand the 
                  challenges of traditional recruitment. With a vision to create a more personal, 
                  efficient, and successful hiring process, she started with just three clients 
                  and a commitment to excellence.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center mx-auto">
                  <ApperIcon name="TrendingUp" className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth & Innovation (2015)</h3>
                <p className="text-gray-600 leading-relaxed">
                  By 2015, we had grown to serve over 1,000 companies and placed more than 10,000 
                  professionals. We launched our technology platform, combining AI-powered matching 
                  with human expertise to deliver even better results for our clients.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-32 h-32 bg-gradient-to-br from-info to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <ApperIcon name="Globe" className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Today & Tomorrow</h3>
                <p className="text-gray-600 leading-relaxed">
                  Today, TalentBridge serves as a trusted partner to over 5,000 companies and has 
                  helped shape the careers of more than 50,000 professionals. We continue to innovate 
                  and evolve, always staying true to our core mission of creating meaningful connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Whether you're seeking your next career opportunity or looking to build your dream team, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/jobs")}
            >
              Find Your Dream Job
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate("/employers")}
            >
              Hire Top Talent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;