// Technique descriptions for common karate techniques
export const techniqueDescriptions: Record<string, string> = {
  // Stances
  'Musubi-dachi': 'Informal attention stance with heels together, toes apart at 45° angle',
  'Seisan-dachi': 'Front stance - forward knee bent, back leg straight, 60% weight on front leg',
  'Shiko-ashi-dachi': 'Horse stance - feet wide apart, knees bent, weight evenly distributed',
  'Uchi-hachiji-dachi': 'Inner figure-eight stance, similar to cat stance with slight variation',
  'Seiza': 'Formal kneeling position with feet tucked under, used for meditation and bowing',
  'Kosa-dachi': 'Cross-legged stance for stability during turning movements',
  'Soto-kaiten-dachi': 'Outward rotation stance used for defensive positioning',
  'Suri-ashi': 'Sliding footwork for smooth movement without bouncing',
  
  // Blocks
  'Age-uke': 'Rising block that deflects attacks to the head',
  'Soto-uke': 'Outside block that parries attacks from outside to inside',
  'Uchi-uke': 'Inside block that parries attacks from inside to outside',
  'Gedan-barai': 'Downward block used against low attacks',
  'Shuto-uke': 'Knife-hand block using the side of the hand',
  'Kakiwake-uke': 'Wedge block that separates dual attacks',
  
  // Punches
  'Choku-zuki': 'Straight punch with fist rotating at impact',
  'Oi-zuki': 'Lunge punch combined with stepping forward',
  'Gyaku-zuki': 'Reverse punch using opposite hand from front leg',
  'Kizami-zuki': 'Jab or leading hand punch for quick attacks',
  
  // Kicks
  'Mae-geri': 'Front kick using ball of foot or heel',
  'Yoko-geri': 'Side kick delivered with foot edge or heel',
  'Mawashi-geri': 'Roundhouse kick using instep or ball of foot',
  'Ushiro-geri': 'Back kick delivered by looking at target over shoulder',
  
  // Strikes
  'Shuto-uchi': 'Knife-hand strike to neck or temple',
  'Haito-uchi': 'Ridge-hand strike using thumb-side of hand',
  'Tettsui-uchi': 'Hammer fist strike for downward or circular attacks',
  'Empi-uchi': 'Elbow strike for close-range combat',
  
  // Grappling
  'Osae-komi': 'Hold-down technique after takedown',
  'Kansetsu-waza': 'Joint lock targeting elbow, wrist, or shoulder',
};

// Helper function to get description for a technique
export function getDescription(techniqueName: string): string {
  return techniqueDescriptions[techniqueName] || 'A fundamental karate technique';
}