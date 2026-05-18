import { Client, Databases } from 'appwrite';

let database: any = null;

export const useDatabase = () => {
  const config = useRuntimeConfig();

  const endpoint = config.public.appwriteEndpoint;
  const projectId = config.public.appwriteProjectId;
  
  if (!endpoint || !projectId) {
    throw new Error('Appwrite endpoint or project ID is not configured');
  }

  // Инициализируем Database клиент если ещё не инициализирован
  if (!database) {
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId);
    
    database = new Databases(client);
  }

  return database;
};
