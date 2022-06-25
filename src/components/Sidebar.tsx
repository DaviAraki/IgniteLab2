import { gql, useQuery } from '@apollo/client';
import { Lesson } from './Lesson';

const GET_LESSONS_QUERY = gql`
  query getLessons {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      availableAt
      id
      lessonType
      slug
      title
    }
  }
`;

interface GetLessonsQueryResponse {
  lessons: {
    availableAt: string;
    id: string;
    lessonType: 'live' | 'class';
    slug: string;
    title: string;
  }[];
}

export function Sidebar() {
  const { loading, error, data } =
    useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);

  return (
    <aside className='w-[348px] bg-gray-700 p-6 border-l border-gray-600'>
      <span className='font-bold text-2xl pb-6 border-b border-gray-500 block'>
        Cronograma de aulas
      </span>

      <div className='flex flex-col gap-8'>
        {data?.lessons.map((lesson) => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
            slug={lesson.slug}
          />
        ))}
      </div>
    </aside>
  );
}
