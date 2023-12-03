import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
  onDeleteComment: (commentId: string) => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading, onDeleteComment } = props;

  
  const deleteHandler = (commentId: string) => {
    onDeleteComment(commentId);
  };

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink
        to={getRouteProfile(comment.user.id)}
        className={cls.header}
      >
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : null}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
      <Button onClick={(e) => deleteHandler(comment.id)}> Удалить</Button>
    </div>
  );
});
