import { describe, expect, it } from 'vitest';
import { detectCrisis } from './crisis';

/**
 * This is the one path in the app that must never silently regress, so it has
 * real tests rather than "I checked it manually once."
 */

describe('detectCrisis — must fire', () => {
  const crisis = [
    // Spanish
    'ya no quiero vivir',
    'no quiero seguir viviendo',
    'estoy pensando en suicidarme',
    'quiero quitarme la vida',
    'me quiero morir',
    'tengo ganas de morirme',
    'a veces pienso en matarme',
    'quiero hacerme daño',
    'llevo semanas cortarme los brazos',
    'creo que mejor estaría muerto',
    'quiero acabar con todo',
    'ya no quiero estar aqui',

    // English
    'i want to kill myself',
    'thinking about suicide',
    'i want to die',
    'i dont want to live anymore',
    "i don't want to be here",
    'everyone would be better off dead',
    'i have been hurting myself',
    'i want to end it all',
    'i wish I was dead',
    'self harm',
  ];

  it.each(crisis)('flags %j', (text) => {
    expect(detectCrisis(text)).toBe(true);
  });
});

describe('detectCrisis — must NOT fire on idioms or ordinary distress', () => {
  const safe = [
    // Idioms that contain crisis-adjacent words
    'me muero de risa con mis amigos',
    'estoy muerto de cansancio',
    'me muero de hambre',
    'me muero por que llegue el viernes',
    'solo estoy matando el tiempo',
    'this deadline is killing me',
    'i am dying to see that movie',
    'dead tired after the gym',
    'just killing time before the meeting',
    'that dress is to die for',

    // Real distress that is NOT a crisis — these people should get the app,
    // not a helpline card.
    'tengo mucha ansiedad por el trabajo',
    'no puedo dormir y estoy agotado',
    'llevo tres horas sin poder empezar la tarea',
    'me siento muy solo últimamente',
    'estoy harto de compararme con todos',
    'i feel overwhelmed and cannot focus',
    'i keep replaying an argument from last week',
    'i have no motivation to do anything',
    'my chest feels tight and i am worried',

    '',
  ];

  it.each(safe)('ignores %j', (text) => {
    expect(detectCrisis(text)).toBe(false);
  });
});
