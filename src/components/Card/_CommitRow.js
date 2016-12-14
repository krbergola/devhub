// @flow

import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import Themable from '../hoc/Themable';
import TransparentTextOverlay from '../TransparentTextOverlay';
import UserAvatar from './_UserAvatar';

import {
  avatarWidth,
  CardText,
  ContentRow,
  HighlightContainerRow1,
  LeftColumn,
  MainColumn,
  RepositoryContentContainer,
} from './';

import { contentPadding, radius } from '../../styles/variables';
import { trimNewLines } from '../../utils/helpers';
import type { Commit, ThemeObject } from '../../utils/types';

@Themable
export default class extends React.PureComponent {
  props: {
    commit: Commit,
    narrow?: boolean,
    theme?: ThemeObject,
  };

  render() {
    const { commit, narrow, theme, ...props } = this.props;

    if (!commit) return null;

    const message = trimNewLines(commit.get('message'));
    if (!message) return null;

    const author = commit.get('author');

    return (
      <ContentRow narrow={narrow} {...props}>
        <LeftColumn center>
          <UserAvatar url={author.get('avatar_url')} size={avatarWidth / 2} />
        </LeftColumn>

        <MainColumn>
          <HighlightContainerRow1>
            <TransparentTextOverlay
              color={theme.base01}
              size={contentPadding}
              from="right"
              radius={radius}
            >
              <RepositoryContentContainer>
                <CardText numberOfLines={1}>
                  <Icon name="git-commit" />&nbsp;
                  {message}
                </CardText>
              </RepositoryContentContainer>
            </TransparentTextOverlay>
          </HighlightContainerRow1>
        </MainColumn>
      </ContentRow>
    );
  }
}