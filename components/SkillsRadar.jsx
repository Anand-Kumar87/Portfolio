'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SkillsRadar() {
  const [skills, setSkills] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data.slice(0, 8))); // Limit to 8 skills for radar
  }, []);

  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  const getSkillPosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div className="glass dark:glass-dark p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-6 text-center">Skills Radar</h3>
      
      <div className="relative w-80 h-80 mx-auto">
        <svg width="300" height="300" className="absolute inset-0">
          {/* Radar circles */}
          {[25, 50, 75, 100].map((r, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth="1"
            />
          ))}
          
          {/* Radar lines */}
          {skills.map((_, index) => {
            const pos = getSkillPosition(index, skills.length);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeWidth="1"
              />
            );
          })}

          {/* Skill points */}
          {skills.map((skill, index) => {
            const pos = getSkillPosition(index, skills.length);
            const skillRadius = (skill.level / 100) * radius;
            const skillPos = {
              x: centerX + skillRadius * Math.cos((index * 2 * Math.PI) / skills.length - Math.PI / 2),
              y: centerY + skillRadius * Math.sin((index * 2 * Math.PI) / skills.length - Math.PI / 2),
            };

            return (
              <motion.circle
                key={skill._id}
                cx={skillPos.x}
                cy={skillPos.y}
                r={hoveredSkill === skill._id ? 8 : 6}
                fill="url(#skillGradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSkill(skill._id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="cursor-pointer"
              />
            );
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Skill labels */}
        {skills.map((skill, index) => {
          const pos = getSkillPosition(index, skills.length);
          const labelOffset = 20;
          const labelPos = {
            x: pos.x + (pos.x > centerX ? labelOffset : -labelOffset),
            y: pos.y + (pos.y > centerY ? labelOffset : -labelOffset),
          };

          return (
            <motion.div
              key={skill._id}
              className={`absolute text-sm font-medium transition-all duration-300 ${
                hoveredSkill === skill._id ? 'text-blue-500 scale-110' : ''
              }`}
              style={{
                left: labelPos.x,
                top: labelPos.y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {skill.name}
              <div className="text-xs text-gray-500">{skill.level}%</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
