import React from 'react';
import { useForm } from 'react-hook-form';
import * as Zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';

import { SearchFormContainer } from './styles';
import { useUser } from '../../../providers/UserProvider';

const searchFormSchema = Zod.object({
  username: Zod.string(),
});

type SearchFormInputs = Zod.infer<typeof searchFormSchema>;

const SearchForm: React.FC = () => {
  const { getUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchUser = async (data: SearchFormInputs): Promise<void> => {
    await getUser(data.username);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchUser)}>
      <input type="text" placeholder="Busque por um usuário" {...register('username')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};

export default SearchForm;
