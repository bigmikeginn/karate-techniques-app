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

  // BJJ positions
  'Closed Guard': 'A control position using both legs around the opponent from the bottom.',
  'Open Guard': 'A guard position where the legs control distance without being locked around the opponent.',
  'Half Guard': 'A guard position controlling one of the opponent\'s legs from the bottom.',
  'Side Control': 'A dominant top position controlling the opponent chest-to-chest from the side.',
  'Mount': 'A dominant top position seated over the opponent with control of their hips and upper body.',
  'Back Control': 'A dominant position behind the opponent, usually with hooks or a seatbelt grip.',
  'Turtle': 'A defensive kneeling position used to protect against pins, passes, and back takes.',
  'North-South': 'A top control position with the bodies facing opposite directions.',
  'Knee on Belly': 'A mobile top control position using one knee to pin and pressure the opponent.',

  // BJJ movement and fundamentals
  'Shrimp Escape': 'A hip escape movement used to create space and recover guard.',
  'Bridge': 'A hip-driving movement used to create space, off-balance an opponent, or start escapes.',
  'Technical Stand-Up': 'A safe way to stand while protecting distance and posture.',
  'Forward Roll': 'A rolling movement used for safety, mobility, and transitions.',
  'Backward Roll': 'A rolling movement used to recover position and move safely on the mat.',
  'Hip Switch': 'A hip movement used to change angles while passing, escaping, or maintaining control.',
  'Frame and Recover': 'Using the arms and body structure to create space and rebuild position.',
  'Pummeling': 'A hand-fighting drill used to win inside control and improve clinch position.',

  // BJJ escapes
  'Bridge and Roll Escape': 'A mount escape using a strong bridge to reverse the opponent.',
  'Elbow Knee Escape': 'A mount escape that uses frames and hip movement to recover guard.',
  'Side Control Frame Escape': 'A side control escape using frames and hip movement to create space.',
  'Back Escape': 'An escape sequence focused on clearing hooks and turning toward a safer position.',
  'Knee on Belly Escape': 'An escape that removes pressure and creates space to recover guard or stand.',
  'Turtle Escape': 'A defensive escape from turtle that prevents back control and rebuilds position.',
  'Headlock Escape': 'An escape that clears head-and-arm control and moves to a safer position.',

  // BJJ guards
  'Butterfly Guard': 'A seated guard using inside hooks to lift, off-balance, and enter attacks.',
  'De La Riva Guard': 'An open guard using an outside leg hook to control and angle around the opponent.',
  'Spider Guard': 'A sleeve-and-foot control guard used to manage distance and off-balance the opponent.',
  'Collar Sleeve Guard': 'A common open guard using collar and sleeve grips to control posture and angles.',
  'X Guard': 'A leg-entangling guard used underneath a standing opponent to sweep or enter leg attacks.',
  'Single Leg X Guard': 'A guard controlling one leg to off-balance, sweep, or transition to other attacks.',

  // BJJ sweeps
  'Scissor Sweep': 'A closed guard sweep using sleeve and collar control with a scissoring leg motion.',
  'Hip Bump Sweep': 'A closed guard sweep using a sit-up motion to knock the opponent over.',
  'Flower Sweep': 'A closed guard sweep that tips the opponent by controlling an arm and blocking a leg.',
  'Butterfly Sweep': 'A seated guard sweep using a butterfly hook to lift and turn the opponent.',
  'Old School Sweep': 'A half guard sweep that comes under the opponent to attack the far leg.',
  'Single Leg X Sweep': 'A sweep from single leg X that off-balances a standing opponent.',
  'De La Riva Sweep': 'A sweep using De La Riva guard hooks and grips to disrupt standing balance.',

  // BJJ guard passing
  'Knee Slice Pass': 'A guard pass that drives one knee through the opponent\'s guard line.',
  'Toreando Pass': 'A standing pass that redirects the legs and circles around the guard.',
  'Over Under Pass': 'A pressure pass controlling one leg over the shoulder and one leg under the arm.',
  'Double Under Pass': 'A pressure pass controlling both legs from underneath to stack and pass.',
  'Stack Pass': 'A pressure pass that folds the opponent to limit hip movement.',
  'Leg Drag': 'A pass that redirects the legs across the body to expose the hips and back.',
  'Body Lock Pass': 'A close-range pass using upper-body control to limit the guard player\'s hips.',

  // BJJ submissions
  'Rear Naked Choke': 'A strangle from back control using the arms without relying on the lapel.',
  'Armbar': 'A straight arm lock that controls the elbow joint.',
  'Triangle Choke': 'A choke using the legs to trap the head and one arm.',
  'Kimura': 'A shoulder lock using a figure-four grip on the opponent\'s arm.',
  'Americana': 'A shoulder lock that bends the arm upward from a dominant top position.',
  'Guillotine': 'A front headlock choke often used when the opponent exposes the neck.',
  'Cross Collar Choke': 'A lapel choke using crossed grips on the collar.',
  'Omoplata': 'A shoulder lock using the legs to control and rotate the opponent\'s arm.',
  'Ezekiel Choke': 'A choke using sleeve or arm control to apply pressure across the neck.',

  // BJJ takedowns and transitions
  'Double Leg Takedown': 'A takedown attacking both legs to bring the opponent to the mat.',
  'Single Leg Takedown': 'A takedown controlling one leg to off-balance and finish.',
  'Ankle Pick': 'A takedown that controls posture while picking the ankle.',
  'Arm Drag to Back': 'A grip and angle change used to move behind the opponent.',
  'Body Lock Takedown': 'A takedown using chest-to-chest control around the body.',
  'Hip Throw': 'A throw using hip position to load and turn the opponent.',
  'Guard Pull': 'A controlled entry to guard from standing.',
  'Guard to Mount': 'A transition from guard or top control into mount.',
  'Side Control to Mount': 'A transition that advances from side control to mount while keeping pressure.',
  'Mount to Back': 'A transition from mount to back control when the opponent turns.',
  'Back Take': 'A transition that moves behind the opponent to establish back control.',
  'Knee on Belly Transition': 'A mobile transition through knee on belly to control or advance position.',
  'Turtle Breakdown': 'A control sequence used to flatten, turn, or expose an opponent in turtle.',
  'Seatbelt Control': 'An upper-body control grip used to maintain back control.',
};

// Helper function to get description for a technique
export function getDescription(techniqueName: string): string {
  return techniqueDescriptions[techniqueName] || 'A fundamental martial arts technique';
}
