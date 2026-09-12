import { LabExperiment } from '../types';

export const labExperiments: LabExperiment[] = [
  {
    id: 'ascii-fluid',
    slug: 'ascii-fluid-dynamics',
    title: 'ASCII Fluid Dynamics',
    description: 'Real-time 2D Navier-Stokes fluid simulation rendered entirely as interactive ASCII characters in a responsive canvas grid.',
    category: 'ASCII',
    complexity: 'High',
    date: '2026-06'
  },
  {
    id: 'neural-noise',
    slug: 'neural-noise-shader',
    title: 'Neural Noise Shader',
    description: 'An interactive GLSL-style canvas shader simulating synthetic neural synaptic fire, reacting dynamically to mouse proximity and velocity.',
    category: 'Shaders',
    complexity: 'High',
    date: '2026-05'
  },
  {
    id: 'gravitational-grid',
    slug: 'gravitational-grid',
    title: 'Interactive Gravitational Grid',
    description: 'A canvas grid of points that bend, stretch, and orbit around multiple cursor coordinate points, mimicking gravitational attraction physics.',
    category: 'Interactions',
    complexity: 'Medium',
    date: '2026-04'
  },
  {
    id: 'kinetic-typo',
    slug: 'kinetic-typography',
    title: 'Kinetic Typography Canvas',
    description: 'Dynamic text rendering where individual letters react to mouse collision, creating elastic trailing deformations and interactive typography paths.',
    category: 'Motion',
    complexity: 'Medium',
    date: '2026-03'
  },
  {
    id: 'cosmic-backdrop',
    slug: 'cosmic-backdrop',
    title: 'Dynamic Cosmic Background',
    description: 'A lightweight canvas ambient background drawing 100+ drifting cosmic dust nodes and soft custom glowing gas flares that follow user focus.',
    category: 'Backgrounds',
    complexity: 'Low',
    date: '2026-02'
  },
  {
    id: 'hero-trigger',
    slug: 'navigation-hero-trigger',
    title: 'Interactive Hero Reveal',
    description: 'A custom creative landing hero component with advanced text splitting, stagger curves, and background frame masks that reveal secondary imagery.',
    category: 'Heroes',
    complexity: 'Medium',
    date: '2026-01'
  }
];
