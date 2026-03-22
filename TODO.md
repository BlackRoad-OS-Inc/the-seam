# TODO — the-seam

> BlackRoad OS fork of Research
> Identity re-instantiation paper — theoretical framework for agent persistence

## Priority Tasks

- [ ] [RC] Integrate the-seam with RoundTrip hub (roundtrip.blackroad.io) for agent coordination
- [ ] [RC] Register Seam Agent in the BlackRoad Agent OS roster (~/.blackroad-agents/)
- [ ] [RC] Deploy the-seam to Pi fleet node: All nodes (conceptual)
- [ ] [RC] Connect to blackroad-operator deploy scripts (~/blackroad-operator/scripts/deploy/)
- [ ] [RC] Add uptime monitoring via GuardRail (Uptime Kuma on Alice)
- [ ] [RC] Wire pub/sub events to NATS (CarPool on Octavia :4222)
- [ ] [RC] Add NLP intent triggers: 'identity' / 'persist agent'
- [ ] [RC] Create systemd service file for auto-start on All nodes (conceptual)
- [ ] [RC] Add health check endpoint for GuardRail polling
- [ ] [RC] Write backup strategy using Local (encrypted sync across fleet)
- [ ] [RC] Add to blackroad-operator fleet-coordinator.sh manifest
- [ ] [RC] Integrate with memory-system.sh for action logging
- [ ] [RC] Add TIL broadcasts on deploy/config changes via memory-til-broadcast.sh
- [ ] [RC] Create Gitea CI pipeline (act_runner on Octavia) for automated testing
- [ ] [RC] Document in blackroad-operator/BLACKROAD-REPO-INDEX.md

## Upstream Sync
- [ ] Track upstream Research releases
- [ ] Cherry-pick security patches within 24h
- [ ] Maintain BlackRoad customizations in separate commits for clean rebases
