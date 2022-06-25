import { DefaultUi, Player, Youtube } from '@vime/react';
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from 'phosphor-react';

import '@vime/core/themes/default.css';
import { gql, useQuery } from '@apollo/client';

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      description
      videoId
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;

interface GetLessonBySlugQueryResponse {
  lesson: {
    title: string;
    description: string;
    videoId: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
  };
}

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data, loading } = useQuery<GetLessonBySlugQueryResponse>(
    GET_LESSON_BY_SLUG_QUERY,
    {
      variables: {
        slug: lessonSlug,
      },
    }
  );

  if (!data || loading) {
    return (
      <div className='flex-1'>
        <p>Loading...</p>
      </div>
    );
  }
  const { title, description, videoId, teacher } = data.lesson;

  return (
    <div className='flex-1'>
      <div className='bg-black flex justify-center'>
        <div className='h-full w-full max-w-[1100px] max-h-[60vh] aspect-video'>
          <Player>
            <Youtube videoId={videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className='p-8 max-w-[1100px] mx-auto'>
        <div className='flex items-start gap-16'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='mt-4 text-gray-200 leading-relaxed'>{description}</p>

            <div className='flex item-center gap-4 mt-6'>
              <img
                src={teacher.avatarURL}
                alt=''
                className='h-16 w-16 border-2 rounded-full border-blue-500'
              />

              <div className='leading-relaxed'>
                <strong className='font-bold text-2xl block'>
                  {teacher.name}
                </strong>
                <span className='text-gray-200 text-sm block'>
                  {teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <a
              href='#'
              className='p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors'
            >
              <DiscordLogo size={24} /> Comunidade do discord
            </a>
            <a
              href='#'
              className='p-4 text-sm  flex items-center rounded font-bold uppercase gap-2 justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition-colors'
            >
              <Lightning size={24} /> Acesse o Desafio
            </a>
          </div>
        </div>
        <div className='gap-8 mt-20 grid grid-cols-2'>
          <a
            href=''
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors'
          >
            <div className='bg-green-700 h-full p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl'>Material complementar</strong>
              <p className='text-sm text-gray-200 mt-2'>
                Acesse o material complementar para acelerar seu desenvolvimento
              </p>
            </div>
            <div className='h-full p-6 flex items-center'>
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href=''
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors'
          >
            <div className='bg-green-700 h-full p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl'>Wallpapers exclusivos</strong>
              <p className='text-sm text-gray-200 mt-2'>
                Acesse o material complementar para acelerar seu desenvolvimento
              </p>
            </div>
            <div className='h-full p-6 flex items-center'>
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}