export interface VisualLabDefinition {
  id: string;
  title: string;
  route: 'academic';
  subjectId: 'physics_first_paper';
  chapterId: string;
  topicIds: string[];
  learningObjectives: string[];
  status: 'published' | 'draft';
}

export interface PhysicsLabState {
  appliedForce: number; // 0 to 100 N
  mass: number; // 1 to 20 kg
  frictionEnabled: boolean;
  frictionForce: number; // 0 to 40 N
  reducedMotion: boolean;
}

export interface SimulationPhysicsResult {
  netForce: number;
  acceleration: number;
  direction: 'right' | 'left' | 'none';
}

export function calculatePhysicsResult(
  appliedForce: number,
  mass: number,
  frictionEnabled: boolean,
  frictionForce: number
): SimulationPhysicsResult {
  const fFriction = frictionEnabled ? Math.min(frictionForce, appliedForce) : 0;
  const netForce = appliedForce - fFriction;
  const safeMass = Math.max(mass, 0.1);
  const acceleration = Number((netForce / safeMass).toFixed(2));

  let direction: 'right' | 'left' | 'none' = 'none';
  if (netForce > 0) direction = 'right';
  else if (netForce < 0) direction = 'left';

  return {
    netForce,
    acceleration,
    direction
  };
}
