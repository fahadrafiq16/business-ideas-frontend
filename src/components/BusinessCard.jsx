import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Link } from 'react-router-dom';

import { TrendingUp } from 'lucide-react';

const BusinessCard = ({ idea, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [, setLocation] = useLocation();


  const isLightBg = ['content'].includes(idea.category);
  const textColor = isLightBg ? 'text-gray-800' : 'text-white';
  const textOpacity = isLightBg ? 'text-gray-700' : 'text-white/80';
  const badgeBg = isLightBg ? 'bg-black/10' : 'bg-white/20';

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
    initial: {
      y: 0,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  const getProgressColor = (rating) => {
    if (rating >= 7) return 'bg-green-400';
    if (rating >= 4) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getCompetitionColor = (rating) => {
    if (rating <= 3) return 'bg-green-400';
    if (rating <= 6) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const dollarMap = {
    '$': 1,
    '$$': 2,
    '$$$': 3,
    '$$$$': 4,
    '$$$$$': 5
  };

  const getCostLevel = (startupCost) => {
    if (typeof startupCost === 'string') {
      return dollarMap[startupCost] !== undefined ? dollarMap[startupCost] : 4;
    }
  
    const num = Number(startupCost);
    if (!isNaN(num)) {
      if (num <= 1000) return 1;
      if (num <= 5000) return 2;
      if (num <= 10000) return 3;
      if (num <= 50000) return 4;
      return 5;
    }
  
    return 4; // fallback
  };

  const {
    popularityRating = 5,
    profitMargin = 6,
    scalability = 5,
    competition = 5,
    workLifeBalance = 7,
    difficulty = 3,
    startupCost,
    timeCommitment,
    speedToRevenue,
    potentialRevenue,
    category,
    name,
    businessType,
    id,
  } = idea;

  const costLevel = getCostLevel(startupCost);


  return (
    <motion.div
      className="rounded-lg overflow-hidden shadow-md relative"
      style={{ background: idea.cardBackground }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-category={idea.category}
    >
      <div className="flex flex-col h-[420px]">
        <div className="p-6 flex flex-col flex-grow">
          <div className={`flex justify-between items-start mb-4 transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-left">
              <span className={`inline-block ${badgeBg} rounded-full text-sm px-3 py-1 mb-2 ${textColor}`}>{index + 1}</span>
              <h3 className={`text-2xl font-bold ${textColor} line-clamp-2`}>{idea.title}</h3>

              <p className={`${textOpacity} capitalize text-left`}>{idea.category.name}</p>

            </div>
            <span className={`inline-block ${badgeBg} rounded-full text-sm px-3 py-1 ${textColor}`}>{businessType}</span>
          </div>

          <div className={`flex-grow flex flex-col transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <div className="space-y-4 mb-auto">
              <div className={`flex justify-between ${textColor}`}>
                <span>Startup Cost:</span>
                <div>
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={i < costLevel ? 'text-white' : 'text-white/30'}>$</span>
                  ))}
                </div>
              </div>
              <div className={`flex justify-between ${textColor}`}>
                <span>Difficulty:</span>
                <div>
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={i < difficulty ? 'text-white' : 'text-white/30'}>★</span>
                  ))}
                </div>
              </div>
              <div className={`flex justify-between ${textColor}`}>
                <span>Time Commitment:</span>
                <span>{timeCommitment}</span>
              </div>
              <div className={`flex justify-between ${textColor} mb-6`}>
                <span>Speed to Revenue:</span>
                <span>{speedToRevenue}</span>
              </div>
            </div>
          </div>
        </div>

        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-[#111827] p-6 flex flex-col z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ height: 'calc(100% - 84px)' }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                {[
                  { label: 'Popularity', icon: '★', value: popularityRating },
                  { label: 'Profit Margins', icon: '💰', value: profitMargin },
                  { label: 'Scalability', icon: '📈', value: scalability },
                  { label: 'Competition', icon: '🏆', value: competition, competitionBar: true },
                  { label: 'Work-Life Balance', icon: '⚖️', value: workLifeBalance }
                ].map(({ label, icon, value, competitionBar }, i) => (
                  <div key={label}>
                    <div className="flex items-center mb-1 text-white">
                      <span className="text-yellow-300 mr-2">{icon}</span> {label}
                    </div>
                    <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`${competitionBar ? getCompetitionColor(value) : getProgressColor(value)} h-3 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${value * 10}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-4"></div>
            </div>
          </motion.div>
        )}

        <div className="p-6 bg-[#111827] z-20 relative h-[84px] flex items-center">
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="text-sm uppercase tracking-wider text-white/80">POTENTIAL REVENUE</div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-1 text-green-400" />
                <span className="text-2xl font-bold text-white">
                  {Number(potentialRevenue)?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
            <Link
  to={`/ideas/${idea.documentId}`}
  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium px-5 py-3 rounded-lg"
  onClick={(e) => e.stopPropagation()}
>
  Learn More
</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCard;
