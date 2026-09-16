import type { EraQuiz } from '../../types/itihaas';

export const ERA_QUIZZES: Record<string, EraQuiz> = {
  'freedom-struggle': {
    eraId: 'freedom-struggle',
    title: 'Freedom Struggle Recap Quiz',
    subtitle: 'Test your mastery of pivotal dates, brave leaders, and cause-and-effect turning points of India’s march to Swaraj.',
    questions: [
      {
        id: 'fs-q1',
        theme: 'cause-effect',
        question: 'Why did Mahatma Gandhi abruptly suspend the nationwide Non-Cooperation Movement in February 1922?',
        options: [
          'The British government agreed to grant immediate Dominion Status',
          'The violent Chauri Chaura incident where protesters set fire to a police station',
          'The Indian National Congress ran out of funds in the Tilak Swaraj Fund',
          'The British repealed the Rowlatt Act and released all political prisoners'
        ],
        correctAnswer: 1,
        explanation: 'Gandhi adhered uncompromisingly to Ahimsa (non-violence). When an agitated crowd in Chauri Chaura (Gorakhpur) retaliated against police firing by burning the police post and killing 22 policemen, Gandhi felt the masses were not yet adequately trained in non-violent discipline and unilaterally halted the movement.'
      },
      {
        id: 'fs-q2',
        theme: 'date',
        question: 'In which historic year and Congress session was "Purna Swaraj" (Complete Independence) officially proclaimed under Jawaharlal Nehru’s presidency?',
        options: [
          '1920 at the Nagpur Session',
          '1929 at the Lahore Session',
          '1931 at the Karachi Session',
          '1942 at the Bombay Gowalia Tank Session'
        ],
        correctAnswer: 1,
        explanation: 'At the midnight hour of 31 December 1929 along the banks of the Ravi River in Lahore, Jawaharlal Nehru unfurled the tricolor and declared complete independence (Purna Swaraj) as the sole aim of Congress, resolving to observe 26 January 1930 as Independence Day.'
      },
      {
        id: 'fs-q3',
        theme: 'figure',
        question: 'Who coined the iconic rallying cry "Swaraj is my birthright and I shall have it!" and founded the Home Rule League in 1916 alongside Annie Besant?',
        options: [
          'Gopal Krishna Gokhale',
          'Bal Gangadhar Tilak',
          'Lala Lajpat Rai',
          'Bipin Chandra Pal'
        ],
        correctAnswer: 1,
        explanation: 'Lokmanya Bal Gangadhar Tilak, a towering leader of the nationalist assertiveness movement, authored this enduring declaration in his Marathi newspaper Kesari and mobilized nationwide public consciousness through public festivals.'
      },
      {
        id: 'fs-q4',
        theme: 'cause-effect',
        question: 'What immediate imperial decision triggered the 1905 Swadeshi Movement and the mass Raksha Bandhan solidarity demonstrations led by Rabindranath Tagore?',
        options: [
          'Lord Curzon’s partition of the Bengal Presidency along communal religious lines',
          'The enforcement of the salt tax monopoly on coastal peasants',
          'The brutal police lathi charge that fatally injured Lala Lajpat Rai',
          'The arrest of Mahatma Gandhi during the Champaran agitation'
        ],
        correctAnswer: 0,
        explanation: 'Lord Curzon partitioned Bengal in October 1905 to weaken the epicentre of Indian intellectual nationalism by dividing Hindu and Muslim communities. This triggered massive public protests, bonfire boycotts of foreign goods, and Tagore leading thousands in tying Rakhis to symbolize indivisible fraternity.'
      },
      {
        id: 'fs-q5',
        theme: 'figure',
        question: 'Which visionary leader mobilized the Indian National Army (Azad Hind Fauj), instituted the women-only Rani of Jhansi Regiment, and gave the battle cry "Jai Hind"?',
        options: [
          'Bhagat Singh',
          'Netaji Subhas Chandra Bose',
          'Chandrashekhar Azad',
          'Sardar Vallabhbhai Patel'
        ],
        correctAnswer: 1,
        explanation: 'Netaji Subhas Chandra Bose established the Provisional Government of Free India in Singapore in October 1943, creating the Rani of Jhansi Regiment under Captain Lakshmi Sahgal and declaring "Give me blood, and I will give you freedom!"'
      }
    ]
  },

  ancient: {
    eraId: 'ancient',
    title: 'Ancient India Recap Quiz',
    subtitle: 'Evaluate your knowledge of the Harappan civilization, Vedic philosophy, and classic empires.',
    questions: [
      {
        id: 'anc-q1',
        theme: 'cause-effect',
        question: 'What profound transformation resulted from Emperor Ashoka’s conquest of Kalinga in 261 BCE?',
        options: [
          'He annexed Sri Lanka through naval conquest',
          'He renounced aggressive warfare (Bherighosha) in favor of moral righteousness (Dhammaghosha)',
          'He disbanded the civil administration and relocated the capital to Ujjain',
          'He authored the military treatise Arthashastra'
        ],
        correctAnswer: 1,
        explanation: 'Overcome with immense grief at the slaughter of over 100,000 people at Kalinga, Ashoka embraced Buddhism, substituted military conquest with moral persuasion (Dhamma), and carved welfare edicts across rocks and pillars across Asia.'
      },
      {
        id: 'anc-q2',
        theme: 'figure',
        question: 'Which legendary scholar from the Gupta Golden Age formulated the place-value zero, approximated pi, and stated that the Earth rotates on its own axis?',
        options: [
          'Varahamihira',
          'Aryabhata',
          'Brahmagupta',
          'Kalidasa'
        ],
        correctAnswer: 1,
        explanation: 'Aryabhata, in his seminal 499 CE treatise Aryabhatiya, laid astronomical and mathematical groundworks including solar and lunar eclipse calculations and the rotation of the Earth.'
      },
      {
        id: 'anc-q3',
        theme: 'date',
        question: 'In approximately which century BCE did Gautama Buddha deliver his first sermon (Dharmachakrapravartana) at Sarnath?',
        options: [
          '15th Century BCE',
          '6th – 5th Century BCE',
          '1st Century BCE',
          '3rd Century CE'
        ],
        correctAnswer: 1,
        explanation: 'The Buddha attained enlightenment and delivered his first sermon at the Deer Park in Sarnath during the 6th to 5th century BCE during the age of Mahajanapadas.'
      }
    ]
  },

  medieval: {
    eraId: 'medieval',
    title: 'Medieval India Recap Quiz',
    subtitle: 'Explore the dynastic epochs of the Sultanates, Vijayanagara, the Mughals, and Maratha Swarajya.',
    questions: [
      {
        id: 'med-q1',
        theme: 'figure',
        question: 'Which ruler was crowned as Chhatrapati at Raigad Fort in 1674, establishing the independent Maratha realm of Swarajya?',
        options: [
          'Sambhaji Maharaj',
          'Chhatrapati Shivaji Maharaj',
          'Peshwa Baji Rao I',
          'Tanaji Malusare'
        ],
        correctAnswer: 1,
        explanation: 'Chhatrapati Shivaji Maharaj was consecrated on 6 June 1674 at Raigad Fort by Gaga Bhatt, institutionalizing Hindavi Swarajya with a council of eight ministers (Ashta Pradhan).'
      },
      {
        id: 'med-q2',
        theme: 'cause-effect',
        question: 'What military technological advantage enabled Babur to defeat Ibrahim Lodi’s massive army at the First Battle of Panipat in 1526?',
        options: [
          'War elephants armored with iron plates',
          'Field gunpowder artillery and Ottoman Tulughma flanking maneuvers',
          'A decisive cavalry alliance with the Portuguese navy',
          'Guerrilla hill ambushes in dense forests'
        ],
        correctAnswer: 1,
        explanation: 'Babur deployed matchlocks and field gunpowder cannons commanded by master gunner Ustad Ali Quli, combined with barricaded baggage carts (Araba) and flanking cavalry maneuvers, routing the Lodi forces within half a day.'
      },
      {
        id: 'med-q3',
        theme: 'date',
        question: 'Under which emperor in the early 16th century did the Vijayanagara Empire reach its pinnacle of cultural and architectural glory at Hampi?',
        options: [
          'Harihara I (1336–1356)',
          'Krishnadevaraya (1509–1529)',
          'Rama Raya (1542–1565)',
          'Bukka Raya I (1356–1377)'
        ],
        correctAnswer: 1,
        explanation: 'Emperor Krishnadevaraya of the Tuluva dynasty patronized the Ashtadiggajas (eight Telugu poets), defeated regional rivals, and constructed the magnificent Vittala temple complex at Hampi.'
      }
    ]
  },

  colonial: {
    eraId: 'colonial',
    title: 'Colonial Era Recap Quiz',
    subtitle: 'Examine the mechanisms of British East India Company conquest and early resistance.',
    questions: [
      {
        id: 'col-q1',
        theme: 'cause-effect',
        question: 'How did Robert Clive’s British forces defeat Nawab Siraj-ud-Daulah’s significantly larger army at the Battle of Plassey in 1757?',
        options: [
          'By deploying advanced steam-powered gunboats on the Bhagirathi River',
          'Through a secret conspiracy bribing the Nawab’s army commander Mir Jafar',
          'By forming a military treaty with the Maratha Confederacy',
          'The Nawab surrendered voluntarily without engaging in combat'
        ],
        correctAnswer: 1,
        explanation: 'Clive conspired with the Nawab’s disgruntled commander Mir Jafar and merchant banker Jagat Seth. During the battle, Mir Jafar withheld the bulk of the Nawab’s troops and advised Siraj to retreat, allowing Clive to seize Bengal.'
      },
      {
        id: 'col-q2',
        theme: 'figure',
        question: 'Which social reformer campaigned relentlessly against the cruel practice of Sati, leading to its statutory abolition by Lord William Bentinck in 1829?',
        options: [
          'Ishwar Chandra Vidyasagar',
          'Raja Ram Mohan Roy',
          'Swami Vivekananda',
          'Jyotirao Phule'
        ],
        correctAnswer: 1,
        explanation: 'Raja Ram Mohan Roy, founder of the Brahmo Samaj, published scholarly treatises citing ancient Sanskrit scriptures to prove Sati lacked religious authorization, prompting Regulation XVII of 1829.'
      },
      {
        id: 'col-q3',
        theme: 'cause-effect',
        question: 'What was the profound consequence of the Treaty of Allahabad following the 1764 Battle of Buxar?',
        options: [
          'The Mughal Emperor was restored to full sovereignty over Delhi',
          'The British East India Company acquired Diwani (tax collection) rights over Bengal, Bihar, and Orissa',
          'The French East India Company was expelled from Pondicherry',
          'Tipu Sultan surrendered half of his territory in Mysore'
        ],
        correctAnswer: 1,
        explanation: 'The Diwani grant legalized direct British taxation over Bengal’s agricultural output and commerce, generating the massive wealth drain that financed the Company’s territorial conquests across the rest of India.'
      }
    ]
  },

  'post-independence': {
    eraId: 'post-independence',
    title: 'Post-Independence India Recap Quiz',
    subtitle: 'Test your understanding of national integration, democracy, and scientific milestones.',
    questions: [
      {
        id: 'post-q1',
        theme: 'figure',
        question: 'Who served as the Chairman of the Drafting Committee of the Constituent Assembly that shaped the Constitution of India?',
        options: [
          'Dr. Rajendra Prasad',
          'Dr. B.R. Ambedkar',
          'Sardar Vallabhbhai Patel',
          'Jawaharlal Nehru'
        ],
        correctAnswer: 1,
        explanation: 'Dr. B.R. Ambedkar led the Drafting Committee, ensuring that fundamental rights, secularism, universal adult suffrage, and protections against caste discrimination were embedded in the supreme law of the land.'
      },
      {
        id: 'post-q2',
        theme: 'cause-effect',
        question: 'What historic milestone did ISRO achieve on 23 August 2023 with the Chandrayaan-3 mission?',
        options: [
          'First crewed spaceflight to low Earth orbit',
          'First nation to execute a soft landing in the Moon’s lunar south polar region',
          'First flyby of Mars on an inaugural attempt',
          'Construction of the Bharatiya Antariksh Station'
        ],
        correctAnswer: 1,
        explanation: 'When the Vikram lander touched down at Shiv Shakti Point near the lunar south pole, India made history as the fourth nation to land on the Moon and the very first to touch down in the uncharted south polar region.'
      },
      {
        id: 'post-q3',
        theme: 'figure',
        question: 'Which legendary leader, known as the "Iron Man of India", orchestrated the diplomatic and political integration of over 560 princely states into the Indian Union?',
        options: [
          'C. Rajagopalachari',
          'Sardar Vallabhbhai Patel',
          'Lal Bahadur Shastri',
          'Maulana Abul Kalam Azad'
        ],
        correctAnswer: 1,
        explanation: 'As India’s first Deputy Prime Minister and Minister of Home Affairs, Sardar Vallabhbhai Patel, assisted by V.P. Menon, unified a patchwork of 565 princely states into a cohesive sovereign republic.'
      }
    ]
  }
};

export const getQuizByEra = (eraId: string): EraQuiz | undefined => {
  return ERA_QUIZZES[eraId];
};
