import React from 'react'
import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

const Footer = () => (
  <FooterWrapper>
    Copyright © 2025 KhodorKhalil
    <GithubLink
      href="https://github.com/khodrkhalil"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaGithub />
    </GithubLink>
  </FooterWrapper>
)

export default Footer

const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
  font-size: 2rem;
`

const GithubLink = styled.a`
  display: flex;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 2rem;
  transition: transform 0.15s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
