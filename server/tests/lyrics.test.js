const request = require('supertest');
const express = require('express');
const app = require('../index'); // Assuming your Express app is exported from index.js

describe('GET /api/lyrics/:artist/:title', () => {
  it('should return lyrics for a valid artist and title', async () => {
    const artist = 'Adele';
    const title = 'Hello';
    const res = await request(app).get(`/api/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('lyrics');
    expect(typeof res.body.lyrics).toBe('string');
  });

  it('should return "Letra não encontrada." for unknown song', async () => {
    const artist = 'UnknownArtist';
    const title = 'UnknownSong';
    const res = await request(app).get(`/api/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.lyrics).toBe('Letra não encontrada.');
  });

  it('should handle missing parameters gracefully', async () => {
    const res = await request(app).get('/api/lyrics//');
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
