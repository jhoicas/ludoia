import React from 'react';

export function TechStack() {
  const technologies = [
    { name: '.NET', color: 'text-purple-600' },
    { name: 'Golang', color: 'text-cyan-500' },
    { name: 'Python', color: 'text-yellow-500' },
    { name: 'React', color: 'text-blue-400' },
    { name: 'AWS', color: 'text-orange-500' },
    { name: 'Azure', color: 'text-blue-600' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
          Stack Tecnológico y Certificaciones
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-2">
              <span className={`font-bold text-xl md:text-2xl ${tech.color} opacity-90`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
