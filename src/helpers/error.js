class PipelineError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PipelineError';
    this.message = message;
  }
}

module.exports = { PipelineError };
