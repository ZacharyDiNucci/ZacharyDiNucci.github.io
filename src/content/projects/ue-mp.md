---
title: 'UE5 Multiplayer Shooter'
description: 'A multiplayer third-person shooter built in Unreal Engine 5 using C++ with peer-to-peer archicature, lobby system, and replicated networked gameplay. Actively in development.'
pubDate: 'Jan 01 2025'
coverImage: '../../assets/blog-placeholder-5.jpg'
tech: ['Unreal Engine 5', 'C++', 'Networking/RPC', 'Steam Networking', 'Animation Trees']
genre: 'TPS / Multiplayer'
liveUrl: 'https://www.youtube.com/watch?v=oYXQitY9csg'
youtubeId: 'oYXQitY9csg'
media:
  - type: youtube
    src: 'oYXQitY9csg'
  - type: image
    src: '/images/projects/tps-shooter/UES_Lobby.png'
  - type: image
    src: '/images/projects/tps-shooter/UES_Damage.png'
  - type: image
    src: '/images/projects/tps-shooter/UES_Enemy.png'
featured: true
status: 'in-progress'
---

## Overview

An Unreal Engine 5 multiplayer third-person shooter built from the ground up in C++, following industry best practices for networked game development and utilizing the Unreal Engine 5 Steam Multiplayer Framework. This is a personal project aimed at deepening my expertise in UE5's systems, multiplayer architecture, and production-quality C++ game systems.

The goal is to ship a polished vertical slice that demonstrates professional-level UE5 development with clean architecture, tight netcode, and a fun gameplay loop.

## Current Progress

- Peer-to-Peer server architecture with listen servers and Steam Networking for matchmaking
- Lobby system with player slot management and ready-up flow
- Player elimination tracking with round-based win conditions
- Networked gameplay using replicated variables and RPC events
- Weapon pickup and ammo management with authority validation

## Planned Features

- Custom game modes and team-based play
- Original level design replacing placeholder Synty assets
- Expanded weapon roster with distinct playstyle archetypes
- Full match flow: pre-game lobby → round → post-match results

## Technical Focus

Every system is built with replication in mind from day one, not retrofitted. Replication authority, variable ownership, and RPC call patterns are treated as first-class design constraints rather than afterthoughts. This forces clean separation between server-authoritative logic and client-side prediction/visual feedback.

## What I'm Learning

Building a production-scale multiplayer game solo is teaching me to think carefully about system boundaries, replication costs, and authority. Netcode bugs are unforgiving and demand a deep understanding of the engine's tick and replication pipeline, this project is raising my ceiling as a UE5 engineer significantly.
