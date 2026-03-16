---
title: 'Food Flingers'
description: 'A team-based VR FPS set in a school cafeteria food fight. Built solo in Unity for Valve Index with custom AI state machines, original 3D assets modeled and rigged in Blender, and a a custom finger tracked combat system.'
pubDate: 'May 01 2021'
coverImage: '../../assets/blog-placeholder-4.jpg'
tech: ['Unity', 'C#', 'Blender', 'VR', 'AI State Machines', 'Valve Index']
genre: 'VR / Action'
liveUrl: 'https://www.youtube.com/watch?v=MZKjC8TQOoc'
youtubeId: 'MZKjC8TQOoc'
media:
  - type: youtube
    src: 'MZKjC8TQOoc'
  - type: image
    src: '/images/projects/food-flingers/FoodFightMenu.png'
  - type: image
    src: '/images/projects/food-flingers/FoodFightAllies.png'
  - type: image
    src: '/images/projects/food-flingers/FoodFightAttacking.png'
  - type: image
    src: '/images/projects/food-flingers/FoodFightAttacking2.png'
  - type: image
    src: '/images/projects/food-flingers/FoodFightEnemyAttack.png'
  - type: image
    src: '/images/projects/food-flingers/FoodFightFood.png'
featured: false
status: 'completed'
---

## Overview

Food Flingers is a solo-developed team-based VR FPS set in a school cafeteria where players duke it out in an all-out food fight. Built for the Valve Index utilizing its finger tracking tech, it combines offensive food-throwing combat with a defensive water-throwing for healing allies, creating a strategy layer on top of the arcade action.

Every visual asset in the game was created from scratch in Blender, including character models, rigs, and the full cafeteria environment.

## My Role

- Solo developer, creating the design, programming, art (minus sound), and gameplay systems
- Built AI state machine systems for both allied and enemy NPCs
- Modeled, rigged, and animated all characters in Blender
- Designed and implemented the finger shape based combat systems and all other gameplay mechanics

## Key Features

- **Dual-Mechanic Gameplay**: Offensive food projectiles eliminate opponents; water projectiles heal teammates, forcing players to balance aggression and support
- **Class Selection**: Inspired by school subjects, each "class" grants unique buffs (increased damage, health pools, etc.)
- **AI-Driven NPCs**: Allied and enemy NPCs use state machines for both animation and their AI. This was the first time I had created this and required taking into account different stats such as total ammo, distance to enemy and if obsticals were in the way.
- **Hand-Tracking Interactions**: Built to take advantage of Valve Index finger-tracking for shooting your projectiles, requiring a different hand shape for each different projectile.
- **Original Art**: All environment and character assets built, textured, and rigged from scratch in Blender

## Technical Highlights

- AI state machines handle multiple concurrent NPC agents without performance degradation
- Custom Unity's VR interactions layer to give the game a different feel and projectiles satisfying, predictable arcs
- Blender-to-Unity animation pipeline established including character rigs, blend trees, and runtime animation events tied to game state

## What I Learned

Building every system and asset solo on a VR project gave me a full-stack view of game development. The biggest lesson was prioritizing the feel of the core mechanicthrowing and catching objects in VR needs to feel right before anything else is worth building around it.
