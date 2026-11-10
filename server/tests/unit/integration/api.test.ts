import type { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../../src/app';
import { InMemoryNoteRepository } from '../../../src/repositories/InMemoryNoteRepositories';

describe('notes API', () => {
  let app: Express;

  // A new app and a new store for every test, so no test depends on another.
  beforeEach(() => {
    app = createApp(new InMemoryNoteRepository());
  });

  it('reports that the service is healthy', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns an empty list before any note exists', async () => {
    const response = await request(app).get('/api/notes');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('creates a note and returns it with 201', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ title: 'Milk', body: 'Two pints' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ title: 'Milk', body: 'Two pints' });
    expect(response.body.id).toEqual(expect.any(String));
  });

  it('lists a note after it has been created', async () => {
    await request(app).post('/api/notes').send({ title: 'Milk' });

    const response = await request(app).get('/api/notes');

    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Milk');
  });

  it('rejects a note without a title with 400', async () => {
    const response = await request(app).post('/api/notes').send({ body: 'x' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Title is required');
  });

  it('rejects a body that is not valid JSON with 400', async () => {
    const response = await request(app)
      .post('/api/notes')
      .set('Content-Type', 'application/json')
      .send('{"title": ');

    expect(response.status).toBe(400);
  });

  it('updates a note', async () => {
    // TODO
  });

  it('returns 404 when updating a note that does not exist', async () => {
    // TODO
  });

  it('returns 400 when updating a note with invalid data', async () => {
    // TODO
  });

  it('deletes a note', async () => {
    // TODO
  });

  it('returns 404 when deleting a note that does not exist', async () => {
    // TODO
  });

  it('returns a JSON 404 for an unknown API path', async () => {
    // TODO
  });
});