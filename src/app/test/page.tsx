"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Globe from "@/components/ui/globe";
import { motion } from "framer-motion";

const GlobalCargoLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-white text-2xl font-bold">GlobalCargo</div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-white">
              Services
            </Button>
            <Button variant="ghost" className="text-white">
              Track
            </Button>
            <Button variant="ghost" className="text-white">
              About
            </Button>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Get Quote
            </Button>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Global Delivery Solutions for Your Business
            </h1>
            <p className="text-slate-300 text-xl mb-8">
              Seamless logistics solutions connecting businesses worldwide with
              reliable, efficient, and sustainable cargo delivery services.
            </p>
            <div className="space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Ship Now
              </Button>
              <Button
                variant="outline"
                className="text-white text-lg px-8 py-6"
              >
                Track Shipment
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="w-full h-[500px] relative">
              <Globe />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-800/50 p-6 rounded-xl"
            >
              <div className="text-blue-500 text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: "🌍",
    title: "Global Network",
    description:
      "Access to over 200 countries and territories worldwide with our extensive delivery network.",
  },
  {
    icon: "⚡",
    title: "Fast Delivery",
    description:
      "Express shipping solutions with real-time tracking and guaranteed delivery times.",
  },
  {
    icon: "🛡️",
    title: "Secure Shipping",
    description:
      "Advanced cargo protection and insurance options for peace of mind.",
  },
];

export default GlobalCargoLanding;
