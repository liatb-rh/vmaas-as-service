export interface HealthResponse {
  status: string;
  time?: string;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as HealthResponse;
}

export async function fetchProxyVersion(): Promise<{ name: string; version: string }> {
  const response = await fetch('/api/version');
  if (!response.ok) {
    throw new Error(`Version request failed: ${response.status}`);
  }
  return (await response.json()) as { name: string; version: string };
}
