import { useEffect, useState } from 'react';
import * as S from './styles';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
}

export const Timer = () => {
    const TARGET_DATE = new Date(2025, 1, 18);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0 });

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date();
        const targetTime = TARGET_DATE.getTime();
        const currentTime = now.getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference <= 0) {
            return { days: 0, hours: 0, minutes: 0 };
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    return (
        <S.TimerContainer>
            <S.TimerText>Leaderboard ends in</S.TimerText>
            <S.TimerValue>
                <S.TimeUnit>
                    <S.Number>{timeLeft.days}</S.Number>
                    <S.Unit>days</S.Unit>
                </S.TimeUnit>
                <S.Separator>:</S.Separator>
                <S.TimeUnit>
                    <S.Number>{timeLeft.hours.toString().padStart(2, '0')}</S.Number>
                    <S.Unit>hours</S.Unit>
                </S.TimeUnit>
                <S.Separator>:</S.Separator>
                <S.TimeUnit>
                    <S.Number>{timeLeft.minutes.toString().padStart(2, '0')}</S.Number>
                    <S.Unit>min</S.Unit>
                </S.TimeUnit>
            </S.TimerValue>
        </S.TimerContainer>
    );
};
