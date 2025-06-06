import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Apple, CheckCircle, Play, Smartphone, Star, Users } from "lucide-react";

export default function DownloadCTA({ 
  appStoreQR = "/images/qrcode.png", 
  playStoreQR = "/images/qrcode.png",
  appStoreUrl = "https://apps.apple.com/gh/app/taskdey/id6739984570",
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.barrister1990.joymish&pcampaignid=web_share"
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const partnerLogos = [
  '/images/yea.jpeg',
  '/images/moe.jpeg',
  '/images/nss.jpeg',
  '/images/tvet.png',
];

  // QR Code component for actual images
  const QRCode = ({ src, alt, platform }) => (
    <div className="w-16 h-16 bg-white rounded-lg p-1 shadow-md">
      <img 
        src={src} 
        alt={alt || `QR code for ${platform}`}
        className="w-full h-full object-contain rounded"
      />
    </div>
  );

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              variants={itemVariants}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white/90 text-sm font-medium">
                4.9/5 Rating • 1K+ Downloads
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Transform Your
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Service Experience
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Join thousands of satisfied users on Ghana&apos;s leading service marketplace.
              Download Taskdey today and experience the difference.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-12"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/70">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">270+</div>
                <div className="text-white/70">Services Booked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/70">Service Providers</div>
              </div>
            </motion.div>
          </div>

          {/* Download Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - App Preview */}
            <motion.div
              className="relative order-2 lg:order-1"
              variants={itemVariants}
            >
              <div className="relative mx-auto w-64 h-96 lg:w-80 lg:h-[500px]">
                {/* Phone mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-white">
                    <Smartphone className="w-16 h-16 mb-4" />
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-2">Taskdey App</h3>
                      <p className="text-sm opacity-90">Your service companion</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 0.5 }}
                >
                  <Users className="w-8 h-8 text-blue-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Download Options */}
            <motion.div
              className="order-1 lg:order-2 space-y-8"
              variants={itemVariants}
            >
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Get the App Now
                </h2>
                <p className="text-white/80 text-lg">
                  Scan the QR code or click the buttons below to download
                </p>
              </div>

              {/* Download Buttons */}
              <div className="space-y-6">
                {/* App Store */}
                <motion.div
                  className="flex items-center gap-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <QRCode 
                    src={appStoreQR} 
                    alt="App Store QR Code" 
                    platform="iOS" 
                  />
                  <div className="flex-1">
                    <Button
                      as="a"
                      href={appStoreUrl}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Apple className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <div className="text-xs opacity-80">Download on the</div>
                        <div className="text-base font-bold">App Store</div>
                      </div>
                    </Button>
                  </div>
                </motion.div>

                {/* Google Play */}
                <motion.div
                  className="flex items-center gap-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <QRCode 
                    src={playStoreQR} 
                    alt="Google Play QR Code" 
                    platform="Android" 
                  />
                  <div className="flex-1">
                    <Button
                      as="a"
                      href={playStoreUrl}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Play className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <div className="text-xs opacity-80">Get it on</div>
                        <div className="text-base font-bold">Google Play</div>
                      </div>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Instant Booking</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Top Rated</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="text-center mt-16 pt-12 border-t border-white/10"
            variants={itemVariants}
          >
            <p className="text-white/60 mb-8">Trusted by leading companies</p>
           <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
      {partnerLogos.map((logo, index) => (
        <div
          key={index}
          className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center p-2"
        >
          <img
            src={logo}
            alt={`Partner ${index + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}