import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  image: string;
  verified: boolean;
  interests: string[];
}

const profiles: Profile[] = [
  {
    id: 1,
    name: 'Анна',
    age: 26,
    location: 'Москва',
    bio: 'Люблю путешествия, йогу и вкусный кофе ☕ Ищу интересного собеседника для прогулок по городу',
    image: 'https://cdn.poehali.dev/projects/4598879f-fbe9-4175-9e16-95e0d4ada04f/files/54b17230-3bce-4c3c-9da2-a201d949f4d3.jpg',
    verified: true,
    interests: ['Путешествия', 'Йога', 'Фотография']
  },
  {
    id: 2,
    name: 'Дмитрий',
    age: 28,
    location: 'Санкт-Петербург',
    bio: 'IT-специалист, любитель активного отдыха. Вечером могу приготовить ужин на двоих 🍝',
    image: 'https://cdn.poehali.dev/projects/4598879f-fbe9-4175-9e16-95e0d4ada04f/files/f26dc4f2-2dc4-4d77-a1b2-092b04891dcd.jpg',
    verified: true,
    interests: ['Спорт', 'Кулинария', 'Технологии']
  },
  {
    id: 3,
    name: 'Мария',
    age: 24,
    location: 'Москва',
    bio: 'Художница и мечтательница. Обожаю закаты, музеи и долгие разговоры под звёздами ✨',
    image: 'https://cdn.poehali.dev/projects/4598879f-fbe9-4175-9e16-95e0d4ada04f/files/338a276e-0b61-4abc-b17d-a6a780debb7c.jpg',
    verified: true,
    interests: ['Искусство', 'Музыка', 'Астрономия']
  }
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState(false);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'right' && currentProfile) {
        const newMatch = Math.random() > 0.5;
        if (newMatch) {
          setMatches(prev => [...prev, currentProfile]);
          setShowMatch(true);
          setTimeout(() => setShowMatch(false), 2000);
        }
      }
      
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
      setSwipeDirection(null);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Знакомства
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowMatches(!showMatches)}
          >
            <Icon name="Heart" size={24} className="text-primary" />
            {matches.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {matches.length}
              </Badge>
            )}
          </Button>
        </div>

        {showMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <Card className="p-8 text-center space-y-4">
              <div className="text-6xl animate-heart-pop">💕</div>
              <h2 className="text-2xl font-bold">Это совпадение!</h2>
              <p className="text-muted-foreground">
                Вы понравились друг другу
              </p>
            </Card>
          </div>
        )}

        {showMatches ? (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Совпадения</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowMatches(false)}>
                <Icon name="X" size={24} />
              </Button>
            </div>
            
            {matches.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">💔</div>
                <p className="text-muted-foreground">
                  Пока нет совпадений. Продолжайте искать!
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => (
                  <Card key={match.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={match.image} alt={match.name} />
                        <AvatarFallback>{match.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{match.name}, {match.age}</h3>
                          {match.verified && (
                            <Icon name="CheckCircle2" size={16} className="text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{match.location}</p>
                      </div>
                      <Button size="sm" className="rounded-full">
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            {currentProfile ? (
              <Card
                className={`overflow-hidden shadow-2xl ${
                  swipeDirection === 'left' ? 'animate-swipe-left' : ''
                } ${swipeDirection === 'right' ? 'animate-swipe-right' : ''}`}
              >
                <div className="relative h-[500px]">
                  <img
                    src={currentProfile.image}
                    alt={currentProfile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    {currentProfile.verified && (
                      <Badge className="bg-primary/90 backdrop-blur-sm">
                        <Icon name="ShieldCheck" size={14} className="mr-1" />
                        Проверен
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-3xl font-bold">
                        {currentProfile.name}, {currentProfile.age}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="MapPin" size={16} />
                      <span className="text-sm">{currentProfile.location}</span>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed">{currentProfile.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary" className="backdrop-blur-sm bg-white/20">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-muted-foreground">
                  Вы просмотрели все профили! Скоро появятся новые
                </p>
              </Card>
            )}

            {currentProfile && (
              <div className="flex justify-center gap-6 mt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 w-16 rounded-full border-2 hover:scale-110 transition-transform"
                  onClick={() => handleSwipe('left')}
                >
                  <Icon name="X" size={28} className="text-destructive" />
                </Button>
                <Button
                  size="lg"
                  className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-transform shadow-lg"
                  onClick={() => handleSwipe('right')}
                >
                  <Icon name="Heart" size={32} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 w-16 rounded-full border-2 hover:scale-110 transition-transform"
                  onClick={() => {}}
                >
                  <Icon name="Star" size={28} className="text-accent-foreground" />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} из {profiles.length} профилей
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
