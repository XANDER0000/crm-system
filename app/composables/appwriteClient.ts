import { Client } from 'appwrite';

let clientInstance: Client | null = null;

export const useAppwriteClient = () => {
  const config = useRuntimeConfig();

  const endpoint = config.public.appwriteEndpoint;
  const projectId = config.public.appwriteProjectId;

  if (!endpoint || !projectId) {
    throw new Error('Appwrite endpoint or project ID is not configured');
  }

  if (!clientInstance) {
    clientInstance = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId);
  }

  return clientInstance;
};