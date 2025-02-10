import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
`;

export const TimerContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
`;

export const TimerText = styled.span`
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
`;

export const TimerValue = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export const TimeUnit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 45px;
`;

export const Number = styled.span`
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

export const Unit = styled.span`
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const Separator = styled.span`
    font-size: 1.25rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.3);
    animation: ${pulse} 1s infinite;
    padding: 0 0.25rem;
`;
