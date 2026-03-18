import { Place } from '@/src/features/places/types/place.model';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

type PlaceRow = {
  id: string;
  title: string;
  imageAssetId: string;
  address: string;
  lat: number;
  lng: number;
};

const db = SQLite.openDatabaseAsync('places.db');

export const init = async (): Promise<SQLiteDatabase> => {
  const database = await db;

  try {
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageAssetId TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
    );

    return database;
  } catch (error) {
    console.error('Error creating places table:', error);
    throw error;
  }
};

export const insertPlace = async (place: Place): Promise<void> => {
  const database = await db;

  try {
    await database.runAsync(
      `INSERT INTO places (title, imageAssetId, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageAssetId,
        place.address,
        place.location.lat,
        place.location.lng,
      ],
    );
  } catch (error) {
    console.error('Error inserting place:', error);
    throw error;
  }
};

export const fetchPlaces = async (): Promise<Place[]> => {
  const database = await db;

  try {
    const places: Place[] = [];
    const result = await database.getAllAsync<PlaceRow>(`SELECT * FROM places`);

    for (const row of result) {
      places.push({
        id: row.id,
        title: row.title,
        imageAssetId: row.imageAssetId,
        address: row.address,
        location: {
          lat: row.lat,
          lng: row.lng,
        },
      });
    }

    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};

export const fetchPlaceById = async (id: string): Promise<Place | null> => {
  const database = await db;

  try {
    const result = await database.getAllAsync<PlaceRow>(
      `SELECT * FROM places WHERE id = ?`,
      [id],
    );

    if (result && result.length > 0) {
      console.log('Place found with ID:', id, 'Result:', result);

      const row = result[0];
      return {
        id: row.id,
        title: row.title,
        imageAssetId: row.imageAssetId,
        address: row.address,
        location: {
          lat: row.lat,
          lng: row.lng,
        },
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching place by ID:', error);
    throw error;
  }
};

export const deletePlace = async (id: string): Promise<void> => {
  const database = await db;

  try {
    await database.runAsync(`DELETE FROM places WHERE id = ?`, [id]);
  } catch (error) {
    console.error('Error deleting place:', error);
    throw error;
  }
};

export const deleteAllPlaces = async (): Promise<void> => {
  const database = await db;

  try {
    await database.runAsync(`DELETE FROM places`);
  } catch (error) {
    console.error('Error deleting all places:', error);
    throw error;
  }
};
