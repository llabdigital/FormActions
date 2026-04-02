import { useActionState } from 'react';

export function NewOpinion() {
  function opinionAction(prevFormState, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('Make sure the title has more than 5 charactors');
    }
    if (!userName.trim()) {
      errors.push('Please provide your name');
    }

    if (body.trim() < 10 || body.trim().length > 3000) {
      errors.push('Opinion must be between 10 and 300 charactors long');
    }

    if (errors.length > 0) {
      return {
        errors: errors,
        enteredValues: {
          title,
          userName,
          body,
        },
      };
    }

    //Submit value to backend if we make it through the check

    return { errors: null };
  }
  const [formState, formAction] = useActionState(opinionAction, {
    errors: null,
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form onSubmit={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" defaultValue={formState.enteredValues?.body} rows={5}></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
