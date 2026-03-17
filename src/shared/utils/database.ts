import { Place } from '@/src/features/places/types/place.model';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

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
    const result = await database.getAllAsync(`SELECT * FROM places`);

    for (const row of result as any[]) {
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
