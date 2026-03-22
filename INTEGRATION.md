# INTEGRATION — the-seam

> How this fork connects to the rest of BlackRoad OS

## Node Assignment

| Property | Value |
|----------|-------|
| **Primary Node** | All nodes (conceptual) |
| **Fork Of** | Research |
| **RoundTrip Agent** | Seam Agent |
| **NLP Intents** | 'identity' / 'persist agent' |
| **NATS Subject** | `blackroad.the-seam.>` |
| **GuardRail Monitor** | `https://guard.blackroad.io/status/the-seam` |

## Deployment

Deploy via blackroad-operator:

```bash
# From blackroad-operator
cd ~/blackroad-operator
./scripts/deploy/deploy-the-seam.sh

# Or via fleet coordinator
./fleet-coordinator.sh deploy the-seam

# Manual deploy to All nodes (conceptual)
ssh blackroad@$(echo "All nodes (conceptual)" | grep -oP '[0-9.]+' || echo "All nodes (conceptual)") \
  "cd /opt/blackroad/the-seam && git pull && sudo systemctl restart the-seam"
```

## Systemd Service

```ini
[Unit]
Description=BlackRoad the-seam (Research fork)
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=blackroad
WorkingDirectory=/opt/blackroad/the-seam
ExecStart=/opt/blackroad/the-seam/start.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## NATS Integration (CarPool)

```bash
# Subscribe to the-seam events
nats sub "blackroad.the-seam.>" --server nats://192.168.4.101:4222

# Publish status
nats pub "blackroad.the-seam.status" '{"node":"All nodes (conceptual)","status":"running"}' \
  --server nats://192.168.4.101:4222
```

## RoundTrip Agent

The **Seam Agent** manages this service via RoundTrip:

```bash
# Check agent status
curl -s https://roundtrip.blackroad.io/api/agents | jq '.[] | select(.name=="Seam Agent")'

# Send command to agent
curl -X POST https://roundtrip.blackroad.io/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"agent":"Seam Agent","message":"status","channel":"fleet"}'
```

## GuardRail Monitoring

Add to Uptime Kuma (Alice :3001):

| Check | URL/Command | Interval |
|-------|------------|----------|
| HTTP Health | `http://All nodes (conceptual):PORT/health` | 30s |
| Process | `systemctl is-active the-seam` | 60s |
| NATS Heartbeat | `blackroad.the-seam.heartbeat` | 60s |

## Memory System Integration

```bash
# Log actions
~/blackroad-operator/scripts/memory/memory-system.sh log deploy the-seam "Deployed to All nodes (conceptual)"

# Add solutions to Codex
~/blackroad-operator/scripts/memory/memory-codex.sh add-solution "the-seam" "How to restart" \
  "sudo systemctl restart the-seam"

# Broadcast learnings
~/blackroad-operator/scripts/memory/memory-til-broadcast.sh broadcast "the-seam" "Config change: ..."
```

## Related Components

| Component | Role | Connection |
|-----------|------|-----------|
| **TollBooth** (WireGuard) | VPN mesh | All traffic between nodes |
| **CarPool** (NATS) | Messaging | Event pub/sub on `blackroad.the-seam.>` |
| **GuardRail** (Uptime Kuma) | Monitoring | Health checks every 30s |
| **RoadMem** (Mem0) | Memory | Persistent agent state |
| **OneWay** (Caddy) | TLS Edge | HTTPS termination on Gematria |
| **RearView** (Qdrant) | Vector Search | Semantic search over the-seam logs |
| **BackRoad** (Portainer) | Containers | Docker management if containerized |
| **PitStop** (Pi-hole) | DNS | Internal `the-seam.blackroad.local` resolution |
