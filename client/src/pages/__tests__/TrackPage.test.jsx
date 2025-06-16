import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TrackPage from '../TrackPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('axios');

const mockTrack = {
  id: 1,
  title: 'Hello',
  artist: { name: 'Adele' },
  album: { cover_medium: 'cover.jpg' },
};

describe('TrackPage', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('renders track details and lyrics', async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/api/track/1') {
        return Promise.resolve({ data: mockTrack });
      }
      if (url === `/api/lyrics/${encodeURIComponent(mockTrack.artist.name)}/${encodeURIComponent(mockTrack.title)}`) {
        return Promise.resolve({ data: { lyrics: 'Hello lyrics' } });
      }
      return Promise.reject(new Error('not found'));
    });

    render(
      <MemoryRouter initialEntries={['/track/1']}>
        <Routes>
          <Route path="/track/:id" element={<TrackPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Carregando música/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(mockTrack.title)).toBeInTheDocument());
    expect(screen.getByText(mockTrack.artist.name)).toBeInTheDocument();
    expect(screen.getByText(/Hello lyrics/i)).toBeInTheDocument();
  });

  it('shows "Letra não encontrada." when lyrics API fails', async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/api/track/1') {
        return Promise.resolve({ data: mockTrack });
      }
      if (url.startsWith('/api/lyrics/')) {
        return Promise.reject(new Error('API error'));
      }
      return Promise.reject(new Error('not found'));
    });

    render(
      <MemoryRouter initialEntries={['/track/1']}>
        <Routes>
          <Route path="/track/:id" element={<TrackPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(mockTrack.title)).toBeInTheDocument());
    expect(screen.getByText(/Letra não encontrada./i)).toBeInTheDocument();
  });
});
