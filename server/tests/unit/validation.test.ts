import { describe, expect, it } from 'vitest';
import {
  MAX_BODY_LENGTH,
  MAX_TITLE_LENGTH,
  validateNoteInput,
} from '../../src/validation';

describe('validateNoteInput', () => {
  it('accepts a title and body and trims both', () => {
    const result = validateNoteInput({ title: '  Milk ', body: ' Two pints ' });

    expect(result).toEqual({
      ok: true,
      value: { title: 'Milk', body: 'Two pints' },
    });
  });

  it('defaults a missing body to an empty string', () => {
    const result = validateNoteInput({ title: 'Milk' });

    expect(result).toEqual({ ok: true, value: { title: 'Milk', body: '' } });
  });

  it.each([
    undefined,
    null,
    {},
    { title: '' },
    { title: '   ' },
    { title: 42 },
  ])('rejects %j because the title is missing', (payload) => {
    const result = validateNoteInput(payload);

    expect(result).toEqual({ ok: false, errors: ['Title is required'] });
  });

  it('rejects a title that is too long', () => {
    // TODO
  });

  it('accepts a title of exactly the maximum length', () => {
    // TODO
  });

  it('rejects a body that is not text', () => {
    // TODO
  });

  it('rejects a body that is too long', () => {
    // TODO
  });

  it('reports every problem at once', () => {
    // TODO
  });
});