import { describe, it, expect } from 'vitest';
import { calculatePhysicsResult } from '../../types/visualLab';

describe('Physics Visual Lab Formula & Calculations', () => {
  it('1. calculates acceleration accurately with force and mass: 40 N net force / 5 kg = 8 m/s²', () => {
    // applied 40N, mass 5kg, friction disabled
    const result = calculatePhysicsResult(40, 5, false, 0);
    expect(result.netForce).toBe(40);
    expect(result.acceleration).toBe(8);
    expect(result.direction).toBe('right');
  });

  it('2. calculates net force correctly with friction: applied 40 N - friction 10 N = 30 N', () => {
    const result = calculatePhysicsResult(40, 5, true, 10);
    expect(result.netForce).toBe(30);
  });

  it('3. calculates acceleration with friction: 30 N / 5 kg = 6 m/s²', () => {
    const result = calculatePhysicsResult(40, 5, true, 10);
    expect(result.netForce).toBe(30);
    expect(result.acceleration).toBe(6);
    expect(result.direction).toBe('right');
  });

  it('4. shows zero acceleration when net force is zero', () => {
    const result1 = calculatePhysicsResult(0, 5, false, 0);
    expect(result1.netForce).toBe(0);
    expect(result1.acceleration).toBe(0);
    expect(result1.direction).toBe('none');

    const result2 = calculatePhysicsResult(10, 5, true, 10);
    expect(result2.netForce).toBe(0);
    expect(result2.acceleration).toBe(0);
    expect(result2.direction).toBe('none');
  });

  it('5. proves higher mass lowers acceleration if net force is unchanged', () => {
    const resLowMass = calculatePhysicsResult(40, 5, false, 0); // 40 / 5 = 8
    const resHighMass = calculatePhysicsResult(40, 10, false, 0); // 40 / 10 = 4

    expect(resHighMass.acceleration).toBeLessThan(resLowMass.acceleration);
    expect(resHighMass.acceleration).toBe(4);
  });

  it('6. validates prediction challenge correct answer is "অর্ধেক হবে" (half)', () => {
    // If mass is doubled (e.g. 5kg -> 10kg) with same netForce (40N):
    const initialAcc = calculatePhysicsResult(40, 5, false, 0).acceleration; // 8 m/s²
    const doubledMassAcc = calculatePhysicsResult(40, 10, false, 0).acceleration; // 4 m/s²

    expect(doubledMassAcc).toBe(initialAcc / 2);
  });
});
