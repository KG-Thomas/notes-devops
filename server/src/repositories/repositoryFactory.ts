import { error } from "console";
import { InMemoryNoteRepository } from "./InMemoryNoteRepositories";
import type { NoteRepository } from "./NoteRepository";

// The only place in the back end that names a concrete repository class.
export function createNoteRepository(storeType: string): NoteRepository {
  // TODO: switch on storeType
  // TODO: 'memory' returns a new InMemoryNoteRepository
  // TODO: anything else throws an Error naming the unknown store type

  switch (storeType) {
    case "memory":
      return new InMemoryNoteRepository();

    default:
      throw new Error(`Unknown Store Type: ${storeType}`);
  }
}
