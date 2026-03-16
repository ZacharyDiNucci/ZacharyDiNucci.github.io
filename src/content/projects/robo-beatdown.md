---
title: 'Robo Beatdown'
description: 'A wave-based top-down escape shooter built in Unreal Engine 5 as a senior capstone. Features 2 different levels with escelating waves of enemies, Blueprint-driven AI behavior trees, and all original low-poly assets modeled and animated in Blender.'
pubDate: 'May 01 2021'
coverImage: '../../assets/blog-placeholder-3.jpg'
tech: ['Unreal Engine 5', 'Blueprints', 'Blender', 'AI Behavior Trees']
genre: 'Top-Down Shooter'
liveUrl: 'https://www.youtube.com/watch?v=rxX9mWiq8Es&t=51s'
youtubeId: 'rxX9mWiq8Es'
thumbnailUrl: '/images/projects/robo-beatdown/RoboMenu.png'
media:
  - type: youtube
    src: 'rxX9mWiq8Es'
  - type: image
    src: '/images/projects/robo-beatdown/RoboMenu.png'
  - type: image
    src: '/images/projects/robo-beatdown/RoboLoading.png'
  - type: image
    src: '/images/projects/robo-beatdown/RoboUI.png'
  - type: image
    src: '/images/projects/robo-beatdown/RoboAI.png'
featured: false
status: 'completed'
---

## Overview

Robo Beatdown is an top-down shooter developed in Unreal Engine 5 as one of my senior capstone projects. Players must survive 10 progressively challenging waves of robot enemies, managing positioning carefully as enemy counts and AI difficulty escalate. This game was inspired by games I would play with friends such as SAS: Zombie Assault giving a base I new I would enjoy and also could build.

Everything from the gameplay systems to the visual assets was built by me Blueprint logic, AI behavior trees, and full low-poly art pipeline from Blender to Unreal.

## My Role

- Solo developer, creating everything from design, programming, and all 3D art
- Built all Blueprint systems for player health, scoring, enemy spawning, and AI
- Designed and implemented behavior trees for two distinct enemy archetypes (melee and ranged)
- Modeled, rigged, and animated all robot characters in Blender

## Key Features

- **10 Escalating Waves**: Enemy counts and aggression scale progressively, requiring players to adapt their strategy
- **Dual Enemy Archetypes**: Melee robots that rush the player and ranged robots move slower but hold distance and fire lasers at the player, forcing different positioning reads
- **Score Persistence Across Levels**: Score carries over through a multi-level structure with a custom loading screen system
- **Full HUD**: First complete HUD built in Unreal Engine, tracking health, score, and wave progress
- **Original Low-Poly Art**: All character and environment assets modeled with a deliberate low-poly aesthetic, keeping visual style consistent

## Technical Highlights

- Behavior trees drive enemy decision-making: melee robots pathfind and close distance aggressively while ranged types maintain separation and prioritize line-of-sight
- Score persistence uses a custom game instance class that survives level transitions, enabling a proper multi-level score arc
- Animation blueprint integration handles locomotion, attack, and death states driven by gameplay events from the AI controller

## What I Learned

This was my first project where I built a full all the assets myself: rigging characters, exporting skeletal meshes, and bringing animations into Unreal's animation blueprints. It demystified a workflow I'd previously avoided and was the first Unreal Engine game I built all myself, allowing me to learn and experience many of it's systems for the first time. 