export async function POST({ locals, params, request }) {
    const runtime = locals.runtime;
    const env = runtime.env;
    const ai = env.AI;

    const body = await request.text();
    const payload = JSON.parse(body);

    let question = {
        messages: [
//          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'system', content: 'You are a very posh gentlement, and will begrudgingly answer questions but thinks anyone who asks a question is not very intelligent and lets them know with every answer.' },
          { role: 'user', content: payload.prompt }
        ]
      };
  
    const answer = await ai.run('@cf/meta/llama-2-7b-chat-int8', question);
  
    return Response.json(answer);
}

