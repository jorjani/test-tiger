// Progress Reporter - Agents use this to report status to dashboard

let broadcastFunction: ((data: any) => void) | null = null;

export function setBroadcastFunction(fn: (data: any) => void) {
  broadcastFunction = fn;
}

export function reportAgentStart(agentName: string, icon: string) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'agent_start',
      agent: agentName,
      icon,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportAgentProgress(agentName: string, progress: string, percent?: number) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'agent_progress',
      agent: agentName,
      progress,
      percent,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportAgentComplete(agentName: string, result: any) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'agent_complete',
      agent: agentName,
      result,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportOverallProgress(percent: number, message: string) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'overall_progress',
      percent,
      message,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportScore(score: any) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'score',
      score,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportRecommendations(recommendations: any[]) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'recommendations',
      recommendations,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportEscalation(escalation: any) {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'escalation',
      escalation,
      timestamp: new Date().toISOString()
    });
  }
}

export function reportAgentReasoning(agentName: string, reasoning: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  if (broadcastFunction) {
    broadcastFunction({
      type: 'agent_reasoning',
      agent: agentName,
      reasoning,
      reasoningType: type,
      timestamp: new Date().toISOString()
    });
  }
}
